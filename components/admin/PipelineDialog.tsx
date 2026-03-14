'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createPipeline, createStage, deleteStage } from '@/app/actions/crm';
import { Plus, Trash2 } from 'lucide-react';

// ============================================================
// Create Pipeline Dialog
// ============================================================
interface PipelineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePipelineDialog({ open, onOpenChange }: PipelineDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await createPipeline(name.trim());
      setName('');
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Pipeline</DialogTitle>
          <DialogDescription>Create a new pipeline for organizing your leads.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <label className="text-sm font-medium text-slate-700">Pipeline Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sales Pipeline"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || isPending} className="bg-[#0b3e63] hover:bg-[#0b3e63]/90">
            {isPending ? 'Creating...' : 'Create Pipeline'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Create Stage Dialog
// ============================================================
interface StageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineId: string;
}

const STAGE_COLORS = [
  '#6366f1', '#3b82f6', '#0ea5e9', '#14b8a6', '#22c55e',
  '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#8b5cf6',
];

export function CreateStageDialog({ open, onOpenChange, pipelineId }: StageDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [color, setColor] = useState(STAGE_COLORS[0]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await createStage(pipelineId, name.trim(), color);
      setName('');
      setColor(STAGE_COLORS[0]);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Stage</DialogTitle>
          <DialogDescription>Add a new stage column to this pipeline.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Stage Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Qualified"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Color</label>
            <div className="flex flex-wrap gap-2">
              {STAGE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${color === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || isPending} className="bg-[#0b3e63] hover:bg-[#0b3e63]/90">
            {isPending ? 'Creating...' : 'Add Stage'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
