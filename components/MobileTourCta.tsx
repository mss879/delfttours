'use client';

import Link from 'next/link';
import { useCurrency } from '@/components/CurrencyProvider';

// Mobile-only sticky booking bar. The desktop booking card is hidden on phones,
// which buried the primary CTA at the bottom of a long itinerary — this keeps
// "Book Now" (and the price, in the visitor's currency) reachable at all times.
export default function MobileTourCta({
  id,
  startingPrice,
}: {
  id: string;
  startingPrice?: string;
}) {
  const { convertPrice } = useCurrency();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            From
          </span>
          <span className="text-base font-bold text-slate-900">
            {startingPrice ? convertPrice(startingPrice) : 'Contact us'}
          </span>
        </div>
        <Link
          href={`/tours/${id}/checkout`}
          className="max-w-[220px] flex-1 rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-bold text-white shadow-md transition-transform active:scale-[0.98]"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
