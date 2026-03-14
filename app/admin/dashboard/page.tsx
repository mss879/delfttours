import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getDashboardStats } from '@/app/actions/crm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MessageSquare, UserCheck, Clock, TrendingUp, Users } from 'lucide-react';
import DashboardChart from '@/components/admin/DashboardChart';
import DashboardCalendar from '@/components/admin/DashboardCalendar';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const stats = await getDashboardStats();

  // Recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const statCards = [
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: stats.pendingInquiries,
      icon: Clock,
      color: 'bg-amber-500',
    },
    {
      title: 'Contacted',
      value: stats.contactedInquiries,
      icon: UserCheck,
      color: 'bg-indigo-500',
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-emerald-500',
    },
    {
      title: 'Converted',
      value: stats.convertedInquiries,
      icon: TrendingUp,
      color: 'bg-violet-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of inquiries, leads, and pipeline activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[80px] ${card.color} opacity-10`} />
                <div className={`inline-flex p-2 rounded-lg ${card.color} bg-opacity-10 mb-2`}>
                  <Icon className={`w-4 h-4 ${card.color.replace('bg-', 'text-')}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                <p className="text-xs text-slate-500 mt-1">{card.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart + Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardChart data={stats.monthlyTrend} />
        </div>
        <div>
          <DashboardCalendar />
        </div>
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">
            Recent Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!recentInquiries || recentInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-16 text-center text-slate-500">
                    No inquiries yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentInquiries.map((inquiry: any) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {inquiry.first_name} {inquiry.last_name}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {inquiry.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize
                          ${inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                          ${inquiry.status === 'resolved' ? 'bg-green-100 text-green-800' : ''}
                        `}
                      >
                        {inquiry.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
