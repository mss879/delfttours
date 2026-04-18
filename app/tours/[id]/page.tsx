import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
import QuoteDialog from '@/components/QuoteDialog';
import StickyBookingCard from '@/components/StickyBookingCard';
import { tourDetails } from '../tour-data';
import { cityHighlights, extractCityFromDayTitle } from '../city-highlights';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';

export function generateStaticParams() {
  return tourDetails.map((tour) => ({
    id: tour.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tour = tourDetails.find((t) => t.id === params.id);

  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  return {
    title: `${tour.title} | Delft Tours`,
    description: tour.description,
    alternates: {
      canonical: `https://delfttours.com/tours/${params.id}`,
    },
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: tour.images && tour.images.length > 0 ? [tour.images[0]] : [],
    },
  };
}

export default function TourPage({ params }: { params: { id: string } }) {
  const tour = tourDetails.find((t) => t.id === params.id);

  if (!tour) {
    notFound();
  }

  // Helper to safely split title (Matches "Title (Duration)" format)
  const titleMatch = tour.title.match(/^(.*?)\s*\((.*?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1] : tour.title;
  const subTitle = titleMatch ? `(${titleMatch[2]})` : '';

  // Get images for carousel
  const carouselImages = tour.images && tour.images.length > 0
    ? tour.images
    : ["/assets/external/placeholder-tour.webp", "/assets/external/placeholder-tour.webp", "/assets/external/placeholder-tour.webp"];

  return (
    <div className="mx-auto flex max-w-[1440px] px-4 flex-col pb-12">
      {/* Breadcrumbs */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 lg:col-span-8">
          <nav className="text-sm max-w-[320px] sm:max-w-full" aria-label="Breadcrumbs">
            <ol className="flex flex-wrap list-none rounded-small">
              <li className="flex items-center">
                <Link href="/" className="flex gap-1 items-center text-foreground/50 hover:opacity-80">
                  <span className="text-sm">Home</span>
                </Link>
                <span className="px-1 text-foreground/50">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/tours" className="flex gap-1 items-center text-foreground/50 hover:opacity-80">
                  <span className="text-sm">Tours</span>
                </Link>
                <span className="px-1 text-foreground/50">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-sm text-foreground font-medium">{mainTitle}</span>
              </li>
            </ol>
          </nav>
          
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{tour.destination || 'Sri Lanka'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-slate-900">
            <span className="font-bold">{mainTitle}</span> {subTitle}
          </h1>
        </div>
      </div>

      {/* Image Slider / Hero */}
      <div className="mt-8 relative w-full mb-4">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselImages.map((img, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-sm group">
                  <Image
                    src={img}
                    alt={`${tour.title} Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 border-none text-white shadow-lg backdrop-blur-sm transition-all" />
            <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 border-none text-white shadow-lg backdrop-blur-sm transition-all" />
          </div>
        </Carousel>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 max-w-6xl mx-auto w-full">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Tour Summary */}
          <div className="bg-[#EFF5FF] w-full p-6 md:p-10 rounded-[2rem] shadow-sm">
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center border-b border-indigo-100/50 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 md:order-first order-last md:mt-0 mt-4 font-serif">
                Tour Overview
              </h2>
              <div className="flex items-center justify-center bg-white px-4 py-2 rounded-full shadow-sm text-sm border border-slate-100">
                <p className="text-slate-500">Suitable for: <span className="font-semibold text-indigo-900">Family, Couple & Friends</span></p>
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-wrap">
                {tour.description}
              </p>
            </div>

            {/* Inclusions Grid */}
            <div className="mt-8 pt-8 border-t border-indigo-100/50">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Included in this Tour</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-slate-600">
                {tour.inclusions && tour.inclusions.length > 0 ? (
                  tour.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start bg-white/60 p-3 rounded-xl border border-white">
                      <span className="flex-shrink-0 mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
                      <p className="text-[14px]">
                        {inc.split('Superior').map((part, index, array) => (
                          <span key={index}>
                            {part}
                            {index < array.length - 1 && (
                              <span className="text-indigo-600 font-bold">Superior</span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">Contact for inclusions details.</p>
                )}
              </div>
            </div>
          </div>

          {/* Itinerary Accordion */}
          {(() => {
            // Pre-compute: each city's highlights appear only on the first day that mentions it
            const shownCities = new Set<string>();
            const dayHighlightsMap = new Map<number, { cityName: string; highlights: import('../city-highlights').CityHighlight[] }>();
            tour.days.forEach((day, index) => {
              const cityName = extractCityFromDayTitle(day.title);
              if (cityName && !shownCities.has(cityName)) {
                const highlights = cityHighlights[cityName] ?? [];
                if (highlights.length > 0) {
                  shownCities.add(cityName);
                  dayHighlightsMap.set(index, { cityName, highlights });
                }
              }
            });

            return (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif">Day By Day Itinerary</h2>
                <Accordion type="single" collapsible defaultValue="day-0" className="w-full space-y-6">
                  {tour.days.map((day, index) => {
                    const dayHighlight = dayHighlightsMap.get(index);

                    return (
                      <AccordionItem key={index} value={`day-${index}`} className="border border-slate-200 rounded-[2rem] bg-white overflow-hidden shadow-sm data-[state=open]:border-indigo-200 data-[state=open]:shadow-md transition-all">
                        <AccordionTrigger className="hover:no-underline px-6 md:px-8 py-6 group">
                          <div className="flex items-center text-left w-full">
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center mr-6 group-data-[state=open]:bg-indigo-600 group-data-[state=open]:text-white transition-colors">
                              <span className="text-[10px] font-bold uppercase tracking-wider">Day</span>
                              <span className="text-lg font-bold leading-none">{index + 1}</span>
                            </div>
                            <div className="flex-1 pr-6">
                              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                                {day.title.replace(/Day \d+[:\s\-]*/i, '')}
                              </h3>
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-6 md:px-8 pb-8 pt-2">
                          <div className="pl-[72px]">
                            <div className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-wrap prose prose-slate max-w-none">
                              {day.description}
                            </div>
                            
                            {/* City Highlights Visualizer — shown only on first day mentioning this city */}
                            {dayHighlight && (
                              <div className="mt-10 border-t border-slate-100 pt-8">
                                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <MapPin className="text-indigo-600 h-5 w-5" />
                                  Highlights in {dayHighlight.cityName}
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {dayHighlight.highlights.map((highlight, idx) => (
                                    <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                                      <Image
                                        src={highlight.image}
                                        alt={highlight.label}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 33vw, 20vw"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <p className="text-white text-xs font-bold leading-tight">
                                          {highlight.label}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            );
          })()}

          {tour.mapImage && (
            <div className="mt-12 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Journey Map</h3>
              <div className="w-full relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden bg-slate-50">
                <Image
                  src={`/package maps/${tour.mapImage}`}
                  alt={`${tour.title} Map`}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar / Booking Card */}
        <div className="lg:block">
          <div className="sticky top-28">
            <StickyBookingCard
              destination={tour.destination || 'Sri Lanka'}
              duration={`${tour.days.length} Days ${tour.days.length - 1} Nights`}
              tourType="Tailor Made"
              startingPrice={tour.startingPrice}
              inclusions={tour.inclusions}
              defaultTheme={tour.themes?.[0]}
              id={tour.id}
            />
            
            {/* Additional info cards can go here in the sidebar */}
            <div className="mt-6 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <h4 className="text-xl font-bold mb-3 relative z-10">Need a Custom Tour?</h4>
              <p className="text-slate-300 text-sm mb-6 relative z-10">
                Our local travel experts can customize this itinerary to perfectly match your interests and schedule.
              </p>
              <Button className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold relative z-10">
                Customize This Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
