import { getEvents } from '@/app/actions/events';
import EventsClient from '@/components/admin/EventsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Events | Delft Admin',
};

export default async function EventsPage() {
  const events = await getEvents(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
        <p className="text-slate-500 mt-1">Create, publish, and manage events shown on the website.</p>
      </div>

      <EventsClient initialEvents={events || []} />
    </div>
  );
}
