'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Columns3, UserPlus } from 'lucide-react';
import { CreatePipelineDialog, CreateStageDialog } from './PipelineDialog';
import KanbanBoard from './KanbanBoard';
import LeadDialog from './LeadDialog';

interface Pipeline {
  id: string;
  name: string;
}

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

interface CrmClientProps {
  pipelines: Pipeline[];
  pipelinesData: Record<string, { stages: Stage[]; leads: Lead[] }>;
}

export default function CrmClient({ pipelines, pipelinesData }: CrmClientProps) {
  const [selectedPipelineId, setSelectedPipelineId] = useState(
    pipelines.length > 0 ? pipelines[0].id : ''
  );
  const [pipelineDialogOpen, setPipelineDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);

  const currentData = selectedPipelineId
    ? pipelinesData[selectedPipelineId] || { stages: [], leads: [] }
    : { stages: [], leads: [] };

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          {pipelines.length > 0 ? (
            <Select value={selectedPipelineId} onValueChange={setSelectedPipelineId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select pipeline" />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm text-slate-500">No pipelines yet. Create one to get started.</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPipelineDialogOpen(true)}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Pipeline
          </Button>
          {selectedPipelineId && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStageDialogOpen(true)}
                className="gap-1.5"
              >
                <Columns3 className="w-3.5 h-3.5" />
                Stage
              </Button>
              <Button
                size="sm"
                onClick={() => setLeadDialogOpen(true)}
                className="gap-1.5 bg-[#0b3e63] hover:bg-[#0b3e63]/90"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add Lead
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      {selectedPipelineId && (
        <KanbanBoard
          pipelineId={selectedPipelineId}
          stages={currentData.stages}
          leads={currentData.leads}
        />
      )}

      {/* Dialogs */}
      <CreatePipelineDialog
        open={pipelineDialogOpen}
        onOpenChange={setPipelineDialogOpen}
      />
      {selectedPipelineId && (
        <>
          <CreateStageDialog
            open={stageDialogOpen}
            onOpenChange={setStageDialogOpen}
            pipelineId={selectedPipelineId}
          />
          <LeadDialog
            open={leadDialogOpen}
            onOpenChange={setLeadDialogOpen}
            pipelineId={selectedPipelineId}
            stages={currentData.stages}
            defaultStageId={currentData.stages[0]?.id}
          />
        </>
      )}
    </>
  );
}
