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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createLead, updateLead, type CreateLeadInput } from '@/app/actions/crm';

interface Stage {
  id: string;
  name: string;
}

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  notes?: string;
  value?: number;
  stage_id?: string;
}

interface LeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineId: string;
  stages: Stage[];
  editLead?: Lead | null;
  defaultStageId?: string;
}

export default function LeadDialog({
  open,
  onOpenChange,
  pipelineId,
  stages,
  editLead,
  defaultStageId,
}: LeadDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [firstName, setFirstName] = useState(editLead?.first_name || '');
  const [lastName, setLastName] = useState(editLead?.last_name || '');
  const [email, setEmail] = useState(editLead?.email || '');
  const [phone, setPhone] = useState(editLead?.phone || '');
  const [notes, setNotes] = useState(editLead?.notes || '');
  const [stageId, setStageId] = useState(editLead?.stage_id || defaultStageId || '');

  const isEditing = !!editLead;

  const handleSubmit = () => {
    if (!firstName || !lastName || !stageId) return;

    startTransition(async () => {
      if (isEditing) {
        await updateLead(editLead!.id, {
          first_name: firstName,
          last_name: lastName,
          email: email || undefined,
          phone: phone || undefined,
          notes: notes || undefined,
          stage_id: stageId,
        });
      } else {
        await createLead({
          pipeline_id: pipelineId,
          stage_id: stageId,
          first_name: firstName,
          last_name: lastName,
          email: email || undefined,
          phone: phone || undefined,
          notes: notes || undefined,
        });
      }
      onOpenChange(false);
      resetForm();
    });
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setStageId(defaultStageId || '');
  };

  // Sync form when editLead changes
  if (open && editLead && firstName === '' && editLead.first_name) {
    setFirstName(editLead.first_name);
    setLastName(editLead.last_name);
    setEmail(editLead.email || '');
    setPhone(editLead.phone || '');
    setNotes(editLead.notes || '');
    setStageId(editLead.stage_id || '');
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if (!val) resetForm(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the lead details.' : 'Add a new lead to your pipeline.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">First Name *</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Last Name *</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>



          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Stage *</label>
            <Select value={stageId} onValueChange={setStageId}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!firstName || !lastName || !stageId || isPending}
            className="bg-[#0b3e63] hover:bg-[#0b3e63]/90"
          >
            {isPending ? 'Saving...' : isEditing ? 'Update Lead' : 'Add Lead'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
