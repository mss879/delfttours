import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from './logout-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns'; // Use date-fns formatted if available, or just built-in Intl

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check auth again (double check, though middleware should handle it)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }

  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching inquiries:', error);
    // Handle error appropriately
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Inquiries</h2>
          <p className="mt-1 text-sm text-slate-500">
            A list of all inquiries submitted through the contact form.
          </p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!inquiries || inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {inquiry.first_name} {inquiry.last_name}
                    </TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.phone || '-'}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                        ${inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                        ${inquiry.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {inquiry.status}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={inquiry.message}>
                      {inquiry.message}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
