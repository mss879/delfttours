'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  published_date: string | null;
}

// Fixed timezone (Sri Lanka) so SSR and client render an identical string and
// avoid a React hydration mismatch on dates near midnight.
function formatDate(d: string | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Colombo',
  });
}

export default function NewsroomListing({ news }: { news: NewsItem[] }) {
  const [active, setActive] = useState<NewsItem | null>(null);

  if (!news || news.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-100 bg-white p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <Newspaper className="mx-auto mb-6 h-16 w-16 text-slate-100" />
        <h3 className="mb-4 font-serif text-3xl text-slate-900">No news just yet.</h3>
        <p className="text-lg text-slate-500">Our latest announcements will appear here soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a3e] to-[#179daa]">
                  <Newspaper className="h-12 w-12 text-white/40" />
                </div>
              )}
            </div>

            <div className="flex flex-grow flex-col p-7">
              {item.published_date && (
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#179daa]">
                  {formatDate(item.published_date)}
                </div>
              )}
              <h2 className="mb-3 line-clamp-2 font-serif text-2xl text-gray-900 transition-colors group-hover:text-[#0b3e63]">
                {item.title}
              </h2>
              <p className="mb-5 line-clamp-3 flex-grow leading-relaxed text-gray-600">
                {item.excerpt || item.content}
              </p>
              <span className="mt-auto inline-flex items-center font-medium text-[#0b3e63] transition-transform duration-300 group-hover:translate-x-1">
                Read more →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Article popup */}
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
                {active.published_date && (
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#179daa]">
                    {formatDate(active.published_date)}
                  </div>
                )}
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-slate-900 sm:text-3xl">
                    {active.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-700">{active.content}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
