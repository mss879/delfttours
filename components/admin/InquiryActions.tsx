'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPlus, ChevronDown, Trash2 } from 'lucide-react';
import { updateInquiryStatus, convertInquiryToLead } from '@/app/actions/crm';
import { createClient } from '@/lib/supabase/client';

interface Pipeline {
  id: string;
  name: string;
}

interface Stage {
  id: string;
  pipeline_id: string;
  name: string;
}

interface InquiryActionsProps {
  inquiryId: string;
  currentStatus: string;
  isConverted: boolean;
  pipelines: Pipeline[];
  stages: Stage[];
}

export default function InquiryActions({
  inquiryId,
  currentStatus,
  isConverted,
  pipelines,
  stages,
}: InquiryActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [convertOpen, setConvertOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  const filteredStages = stages.filter(
    (s) => s.pipeline_id === selectedPipeline
  );

  const handleStatusChange = (status: string) => {
    startTransition(async () => {
      await updateInquiryStatus(inquiryId, status);
    });
  };

  const handleConvert = () => {
    if (!selectedPipeline || !selectedStage) return;
    startTransition(async () => {
      await convertInquiryToLead(inquiryId, selectedPipeline, selectedStage);
      setConvertOpen(false);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.from('inquiries').delete().eq('id', inquiryId);
      setDeleteOpen(false);
      window.location.reload();
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Status dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs" disabled={isPending}>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize
                ${currentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${currentStatus === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                ${currentStatus === 'resolved' ? 'bg-green-100 text-green-800' : ''}
              `}>
                {currentStatus}
              </span>
              <ChevronDown className="ml-1 w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('contacted')}>
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
              Contacted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('resolved')}>
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              Resolved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Send to CRM button */}
        {!isConverted && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={() => setConvertOpen(true)}
            disabled={isPending}
          >
            <UserPlus className="w-3 h-3" />
            Send to CRM
          </Button>
        )}

        {isConverted && (
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700">
            In CRM ✓
          </span>
        )}

        {/* Delete button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-1.5"
          onClick={() => setDeleteOpen(true)}
          disabled={isPending}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Send to CRM Dialog — using native selects to avoid Radix portal z-index issues */}
      <Dialog open={convertOpen} onOpenChange={setConvertOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send to CRM</DialogTitle>
            <DialogDescription>
              Choose a pipeline and stage to add this inquiry as a lead.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Pipeline</label>
              <select
                value={selectedPipeline}
                onChange={(e) => {
                  setSelectedPipeline(e.target.value);
                  setSelectedStage('');
                }}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
              >
                <option value="">Select pipeline</option>
                {pipelines.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                disabled={!selectedPipeline}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50"
              >
                <option value="">Select stage</option>
                {filteredStages.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConvertOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConvert}
              disabled={!selectedPipeline || !selectedStage || isPending}
              className="bg-[#0b3e63] hover:bg-[#0b3e63]/90"
            >
              {isPending ? 'Sending...' : 'Send to CRM'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Inquiry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
