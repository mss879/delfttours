'use client';

import { useState, useTransition, DragEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Mail, Phone, GripVertical, MoreHorizontal, Eye, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { moveLeadToStage, deleteLead, deleteStage } from '@/app/actions/crm';
import LeadDialog from './LeadDialog';

interface Stage {
  id: string;
  name: string;
  color: string;
  position: number;
  pipeline_id: string;
}

interface Lead {
  id: string;
  pipeline_id: string;
  stage_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  source?: string;
  notes?: string;
  value?: number;
  position: number;
}

interface KanbanBoardProps {
  pipelineId: string;
  stages: Stage[];
  leads: Lead[];
}

/** Parse notes like "Country: UK\nTravelers: 2" into key-value pairs */
function parseNotes(notes: string): { key: string; value: string }[] {
  if (!notes) return [];
  return notes
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        return {
          key: line.substring(0, colonIdx).trim(),
          value: line.substring(colonIdx + 1).trim(),
        };
      }
      return { key: '', value: line.trim() };
    });
}

export default function KanbanBoard({ pipelineId, stages, leads }: KanbanBoardProps) {
  const [isPending, startTransition] = useTransition();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [defaultStageId, setDefaultStageId] = useState<string>('');
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  const getLeadsForStage = (stageId: string) =>
    leads.filter((l) => l.stage_id === stageId).sort((a, b) => a.position - b.position);

  const getStageForLead = (lead: Lead) =>
    stages.find((s) => s.id === lead.stage_id);

  // DnD handlers
  const handleDragStart = (e: DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStageId(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStageId(null);
  };

  const handleDrop = (e: DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    setDragOverStageId(null);
    setDraggedLeadId(null);

    if (!leadId) return;

    const stageLeads = getLeadsForStage(stageId);
    const newPosition = stageLeads.length;

    startTransition(async () => {
      await moveLeadToStage(leadId, stageId, newPosition);
    });
  };

  const handleDeleteLead = (leadId: string) => {
    startTransition(async () => {
      await deleteLead(leadId);
    });
  };

  const handleDeleteStage = (stageId: string) => {
    startTransition(async () => {
      await deleteStage(stageId);
    });
  };

  const openAddLead = (stageId: string) => {
    setEditingLead(null);
    setDefaultStageId(stageId);
    setLeadDialogOpen(true);
  };

  const openEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setDefaultStageId(lead.stage_id);
    setLeadDialogOpen(true);
  };

  if (stages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        No stages yet. Add a stage to start building your pipeline.
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '500px' }}>
        {stages.map((stage) => {
          const stageLeads = getLeadsForStage(stage.id);
          const isOver = dragOverStageId === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-[300px] flex flex-col rounded-xl transition-colors ${isOver ? 'bg-blue-50 ring-2 ring-blue-300' : 'bg-slate-100/80'
                }`}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-sm font-semibold text-slate-800">{stage.name}</h3>
                  <span className="text-xs text-slate-400 bg-white px-1.5 py-0.5 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openAddLead(stage.id)}
                    className="p-1 rounded hover:bg-white transition-colors"
                    title="Add lead"
                  >
                    <Plus className="w-4 h-4 text-slate-500" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-white transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteStage(stage.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                        Delete Stage
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Lead Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className={`p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all border-0 shadow-sm ${draggedLeadId === lead.id ? 'opacity-50 scale-95' : ''
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <GripVertical className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {lead.first_name} {lead.last_name}
                          </p>
                          {(lead.source === 'inquiry' || lead.source === 'quote') && (
                            <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5 ${lead.source === 'quote'
                                ? 'bg-violet-100 text-violet-700'
                                : 'bg-blue-100 text-blue-700'
                              }`}>
                              {lead.source === 'quote' ? 'Quote Request' : 'From Inquiry'}
                            </span>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-0.5 rounded hover:bg-slate-100">
                            <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewingLead(lead)}>
                            <Eye className="w-3.5 h-3.5 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditLead(lead)}>
                            Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-2 space-y-1">
                      {lead.email && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                    Drop leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View Lead Dialog */}
      <Dialog open={!!viewingLead} onOpenChange={(open) => !open && setViewingLead(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingLead?.first_name} {viewingLead?.last_name}
              {viewingLead?.source && viewingLead.source !== 'manual' && (
                <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full ${viewingLead.source === 'quote'
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-blue-100 text-blue-700'
                  }`}>
                  {viewingLead.source === 'quote' ? 'Quote Request' : 'From Inquiry'}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {viewingLead && (
            <div className="space-y-4 py-2">
              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-3">
                {viewingLead.email && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Email</p>
                    <p className="text-sm text-slate-800">{viewingLead.email}</p>
                  </div>
                )}
                {viewingLead.phone && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Phone</p>
                    <p className="text-sm text-slate-800">{viewingLead.phone}</p>
                  </div>
                )}
              </div>

              {/* Stage */}
              {(() => {
                const stage = getStageForLead(viewingLead);
                return stage ? (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Current Stage</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                      <p className="text-sm font-medium text-slate-800">{stage.name}</p>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Notes / Structured Details */}
              {viewingLead.notes && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Details</p>
                  <div className="bg-slate-50 rounded-lg divide-y divide-slate-200">
                    {parseNotes(viewingLead.notes).map((item, idx) => (
                      <div key={idx} className="px-3 py-2.5 flex justify-between items-start gap-3">
                        {item.key ? (
                          <>
                            <span className="text-xs font-medium text-slate-500 shrink-0">{item.key}</span>
                            <span className="text-sm text-slate-800 text-right">{item.value}</span>
                          </>
                        ) : (
                          <span className="text-sm text-slate-800">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewingLead(null);
                    openEditLead(viewingLead);
                  }}
                >
                  Edit Lead
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingLead(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <LeadDialog
        open={leadDialogOpen}
        onOpenChange={setLeadDialogOpen}
        pipelineId={pipelineId}
        stages={stages}
        editLead={editingLead}
        defaultStageId={defaultStageId}
      />
    </>
  );
}
