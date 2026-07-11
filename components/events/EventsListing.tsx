'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, CalendarDays } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
}

// Format in a fixed timezone (Sri Lanka) so the server (usually UTC) and the
// visitor's browser render the same string — otherwise dates near midnight can
// differ and trigger a React hydration mismatch.
const TZ = 'Asia/Colombo';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ,
  });
}

function formatShortDate(iso: string | null): string {
  if (!iso) return 'Date TBA';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: TZ,
  });
}

export default function EventsListing({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState<EventItem | null>(null);

  if (!events || events.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-100 bg-white p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <CalendarDays className="mx-auto mb-6 h-16 w-16 text-slate-100" />
        <h3 className="mb-4 font-serif text-3xl text-slate-900">No upcoming events right now.</h3>
        <p className="text-lg text-slate-500">Check back soon — we&apos;re planning something special.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <button
            key={ev.id}
            onClick={() => setActive(ev)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              {ev.image_url ? (
                <Image
                  src={ev.image_url}
                  alt={ev.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a3e] to-[#179daa]">
                  <CalendarDays className="h-12 w-12 text-white/40" />
                </div>
              )}
              {ev.event_date && (
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#0b3e63] shadow-sm backdrop-blur-sm">
                  {formatShortDate(ev.event_date)}
                </div>
              )}
            </div>

            <div className="flex flex-grow flex-col p-7">
              <h2 className="mb-3 line-clamp-2 font-serif text-2xl text-gray-900 transition-colors group-hover:text-[#0b3e63]">
                {ev.title}
              </h2>
              {ev.location && (
                <div className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" /> {ev.location}
                </div>
              )}
              <p className="mb-5 line-clamp-3 flex-grow leading-relaxed text-gray-600">{ev.description}</p>
              <span className="mt-auto inline-flex items-center font-medium text-[#0b3e63] transition-transform duration-300 group-hover:translate-x-1">
                View details →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Event detail popup */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              {active.image_url && (
                <div className="relative h-64 w-full bg-slate-100">
                  <Image src={active.image_url} alt={active.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-slate-900 sm:text-3xl">
                    {active.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  {active.event_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-[#179daa]" /> {formatDate(active.event_date)}
                    </span>
                  )}
                  {active.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#179daa]" /> {active.location}
                    </span>
                  )}
                </div>
                <p className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-700">{active.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
