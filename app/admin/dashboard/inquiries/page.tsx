import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getPipelines } from '@/app/actions/crm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import InquiryActions from '@/components/admin/InquiryActions';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  const pipelines = await getPipelines();

  // Fetch all stages for all pipelines (for the convert dialog)
  const { data: allStages } = await supabase
    .from('pipeline_stages')
    .select('*')
    .order('position', { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
        <p className="text-sm text-slate-500 mt-1">
          All inquiries submitted through the contact form. Convert inquiries to leads in your CRM.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Message</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!inquiries || inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry: any) => (
                  <TableRow key={inquiry.id} className="hover:bg-slate-50/50">
                    <TableCell className="whitespace-nowrap text-sm text-slate-600">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {inquiry.first_name} {inquiry.last_name}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {inquiry.email}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {inquiry.phone || '-'}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-slate-600" title={inquiry.message}>
                      {inquiry.message}
                    </TableCell>
                    <TableCell className="text-right">
                      <InquiryActions
                        inquiryId={inquiry.id}
                        currentStatus={inquiry.status}
                        isConverted={inquiry.converted_to_lead || false}
                        pipelines={pipelines || []}
                        stages={allStages || []}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
