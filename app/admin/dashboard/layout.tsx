import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar userEmail={user.email || ''} />
      <div className="lg:pl-64 transition-all duration-300">
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
