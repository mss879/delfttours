import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TourDetail } from '@/app/tours/tour-data';
import { CalendarDays, MapPin, Users, Info, CheckCircle2, Clock, Globe2, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import QuoteDialog from './QuoteDialog';
import StickyBookingCard from './StickyBookingCard';

interface TourDetailContentProps {
  tour: TourDetail;
}

export default function TourDetailContent({ tour }: TourDetailContentProps) {
  // Helper to safely split title
  const titleParts = tour.title.split('-');
  const mainTitle = titleParts[0];
  const subTitle = titleParts.slice(1).join('-');

  // Calculate stats
  const duration = `${tour.days.length} Days / ${tour.days.length - 1} Nights`;
  const location = tour.destination || 'Sri Lanka';
  const type = "Private Tour";

  return (
    <div className="flex flex-col pb-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* 1. HEADER SECTION */}
      <div className="px-1 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {tour.themes?.map(theme => (
            <Badge key={theme} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
              {theme}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {mainTitle} <span className="text-slate-500 font-normal">{subTitle}</span>
        </h1>
        <div className="flex items-center gap-2 mt-3 text-slate-500 font-medium">
          <MapPin className="w-5 h-5 text-indigo-500" />
          <span>{location}</span>
        </div>
      </div>

      {/* 2. HERO IMAGE CAROUSEL */}
      <div className="mb-8 relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100">
        <Carousel className="w-full">
          <CarouselContent>
            {tour.images && tour.images.length > 0 ? (
              tour.images.map((imgSrc, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative h-[400px] md:h-[500px] w-full">
                    <Image
                      src={imgSrc}
                      alt={`${tour.title} - Image ${index + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="basis-full">
                <div className="relative h-[400px] md:h-[500px] w-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400">No Image Available</span>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
          <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
        </Carousel>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        {/* LEFT COLUMN: ITINERARY & DETAILS */}
        <div className="lg:col-span-2 space-y-10">

          {/* Quick Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-evenly gap-8 p-8 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            <div className="flex flex-col items-center justify-center text-center gap-3 min-w-[120px]">
              <div className="p-3.5 bg-indigo-50 rounded-2xl text-indigo-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.1em] text-slate-400 font-bold mb-1">Duration</span>
                <span className="text-lg font-bold text-slate-900">{tour.days.length} Days</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

            <div className="flex flex-col items-center justify-center text-center gap-3 min-w-[120px]">
              <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.1em] text-slate-400 font-bold mb-1">Location</span>
                <span className="text-lg font-bold text-slate-900">Sri Lanka</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

            <div className="flex flex-col items-center justify-center text-center gap-3 min-w-[120px]">
              <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.1em] text-slate-400 font-bold mb-1">Type</span>
                <span className="text-lg font-bold text-slate-900">Private Tour</span>
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Experience Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
              {tour.description}
            </p>
          </div>

          {/* Inclusions */}
          <div className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
              {(tour.inclusions && tour.inclusions.length > 0) ? tour.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  <span className="text-slate-700 font-medium">
                    {inc.split('Superior').map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span className="text-[#0b3e63] font-bold">Superior</span>
                        )}
                      </span>
                    ))}
                  </span>
                </div>
              )) : <span className="text-slate-500 italic">Details available on request</span>}
            </div>
          </div>

          {/* ITINERARY TIMELINE */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Daily Itinerary</h2>
            <div className="pl-4 border-l-2 border-indigo-100 space-y-8 relative">
              {tour.days.map((day, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[21px] top-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm z-10">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {day.title.replace(/Day \d+[:\s\-]*/i, '').trim()}
                    </h3>
                    <div className="space-y-2.5">
                      {day.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <div key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          {tour.mapImage && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Route Map</h2>
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner h-[300px] sm:h-[450px] relative">
                <Image
                  src={`/package maps/${tour.mapImage}`}
                  alt="Tour Route Map"
                  fill
                  className="object-contain p-4 mix-blend-multiply"
                />
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: STICKY BOOKING CARD */}
        <div className="lg:block relative">
          <StickyBookingCard
            destination={location}
            duration={duration}
            tourType={type}
            startingPrice={tour.startingPrice}
            inclusions={tour.inclusions}
            defaultTheme={tour.themes?.[0]}
          />
        </div>

      </div>
    </div>
  );
}
