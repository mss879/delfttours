import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getBookings } from '@/app/actions/bookings';
import BookingsClient from '@/components/admin/BookingsClient';

export const dynamic = 'force-dynamic';

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const bookings = await getBookings();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
        <p className="text-sm text-slate-500 mt-1">
          All tour booking submissions from the checkout flow.
        </p>
      </div>

      {/* Bookings Table */}
      <BookingsClient bookings={bookings || []} />
    </div>
  );
}
