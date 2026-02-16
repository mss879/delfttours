'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteDialog from './QuoteDialog';
import { useCurrency } from './CurrencyProvider';
import CurrencySwitcher from './CurrencySwitcher';

interface StickyBookingCardProps {
  destination?: string;
  duration: string;
  tourType?: string;
  startingPrice?: string;
  inclusions?: string[];
  defaultTheme?: string;
}

export default function StickyBookingCard({
  destination = 'Sri Lanka',
  duration,
  tourType = 'Tailor Made',
  startingPrice,
  inclusions = [],
  defaultTheme,
}: StickyBookingCardProps) {
  const [showInclusions, setShowInclusions] = useState(false);
  const { convertPrice, currency, isLoading } = useCurrency();

  return (
    <div className="sticky top-[120px] bg-white shadow-lg rounded-xl text-[#6A6A6A] overflow-hidden border border-slate-100">
      <div className="p-7 space-y-5">
        {/* Destination & Tour Type Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-sm font-light text-slate-500">Destination</p>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/flags/flag-lk.png"
                alt={destination}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold text-slate-900">{destination}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-light text-slate-500">Type of tour</p>
            <span className="inline-block bg-emerald-50 text-emerald-700 font-medium text-sm px-3 py-1.5 rounded-md truncate max-w-full">
              {tourType}
            </span>
          </div>
        </div>

        {/* Duration & Inclusions Row */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <div>
            <p className="mb-2 text-sm font-light text-slate-500">Duration</p>
            <p className="font-semibold text-slate-900">{duration}</p>
          </div>
          <div className="flex items-end h-full">
            {inclusions.length > 0 && (
              <button
                onClick={() => setShowInclusions(!showInclusions)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-2 flex items-center gap-1 transition-colors"
              >
                {showInclusions ? 'Hide' : 'Show'} Inclusions
                {showInclusions ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Inclusions Dropdown */}
        {showInclusions && inclusions.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 border border-slate-100 animate-in slide-in-from-top-2 duration-200">
            {inclusions.map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        )}

        {/* Starting Price */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <p className="text-sm font-light text-slate-500">Starting at</p>
            <CurrencySwitcher />
          </div>
          <p className="text-slate-900 font-bold text-[36px] leading-tight mt-1">
            {isLoading ? (
              <span className="inline-block w-40 h-10 bg-slate-100 rounded animate-pulse" />
            ) : (
              convertPrice(startingPrice)
            )}
          </p>
          <p className="text-sm font-light text-slate-500">Per Person, sharing a double room</p>
        </div>

        {/* Expert Section */}
        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <div className="relative w-[48px] h-[48px] shrink-0">
            <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-white border-2 border-slate-100 shadow-md flex items-center justify-center p-1.5">
              <Image
                src="/delgyortoginallogo.png"
                alt="Delft Tours"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm">Hello! We&apos;re Delft Tours</p>
            <p className="text-[13px] text-slate-500 leading-snug mt-1">
              Your dedicated travel experts. We are online <span className="font-bold text-slate-700">24/7</span> — feel free to get a quote. <span className="font-bold text-slate-700">Let&apos;s plan your dream getaway!</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-2">
          <QuoteDialog defaultTheme={defaultTheme}>
            <Button className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base shadow-lg shadow-green-100 transition-all hover:shadow-green-200 hover:scale-[1.02]">
              <MessageCircle className="w-5 h-5 mr-2" />
              Get a Quote
            </Button>
          </QuoteDialog>
          <p className="text-center font-light text-[13px] text-slate-400">
            *Our reply time is almost instant
          </p>
        </div>
      </div>
    </div>
  );
}
