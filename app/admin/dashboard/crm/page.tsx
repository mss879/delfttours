import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getPipelines, getStages, getLeads } from '@/app/actions/crm';
import CrmClient from '@/components/admin/CrmClient';

export const dynamic = 'force-dynamic';

export default async function CrmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const pipelines = await getPipelines();

  // Pre-fetch all stages and leads for all pipelines
  const pipelinesData: Record<string, { stages: any[]; leads: any[] }> = {};
  for (const pipeline of pipelines || []) {
    const [stages, leads] = await Promise.all([
      getStages(pipeline.id),
      getLeads(pipeline.id),
    ]);
    pipelinesData[pipeline.id] = { stages: stages || [], leads: leads || [] };
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">CRM</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your sales pipeline with drag-and-drop leads.
        </p>
      </div>

      <CrmClient
        pipelines={pipelines || []}
        pipelinesData={pipelinesData}
      />
    </div>
  );
}
