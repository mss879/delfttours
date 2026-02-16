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
import { Metadata } from 'next';

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
    title: tour.title,
    description: tour.description,
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

  // Helper to safely split title
  // Helper to safely split title
  // Matches "Title (Duration)" format
  const titleMatch = tour.title.match(/^(.*?)\s*\((.*?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1] : tour.title;
  const subTitle = titleMatch ? `(${titleMatch[2]})` : '';

  return (
    <div className="mx-auto flex max-w-[1440px] px-4 flex-col pb-12">
      {/* Breadcrumbs */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <div className="mt-[24px] mb-6">
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
                  <span className="text-sm text-foreground">{tour.destination || 'Sri Lanka'}</span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="mt-6 px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal">
              <span className="font-bold">{mainTitle}</span> {subTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="mt-6 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {/* Placeholder images since PDF didn't have images */}
            <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="w-full relative h-[250px] md:h-[450px]">
                  <Image
                    src="/assets/external/placeholder-tour.png"
                    alt="Tour Image"
                    fill
                    className="object-cover w-full h-full rounded-[20px]"
                  />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="w-full relative h-[250px] md:h-[450px]">
                  <Image
                    src="/assets/external/placeholder-tour.png"
                    alt="Tour Image"
                    fill
                    className="object-cover w-full h-full rounded-[20px]"
                  />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="w-full relative h-[250px] md:h-[450px]">
                  <Image
                    src="/assets/external/placeholder-tour.png"
                    alt="Tour Image"
                    fill
                    className="object-cover w-full h-full rounded-[20px]"
                  />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>

      {/* Tour Summary */}
      <div className="bg-[#EFF5FF] w-full lg:p-[48px] p-[24px] rounded-[20px] my-8 lg:my-12">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="text-[30px] font-bold md:order-first order-last md:mt-0 mt-4">Tour Summary</h2>
          <div className="flex items-center justify-center">
            <p className="text-[#6A6A6A]">Suitable for: <span className="font-semibold text-black">Family, Couple & Friends</span></p>
          </div>
        </div>
        <div>
          <p className="text-[#6A6A6A] mt-6 text-[14px] lg:text-[16px] text-justify whitespace-pre-wrap">
            {tour.description}
          </p>
        </div>

        {/* Inclusions Grid */}
        <div className="mt-8">
          <h3 className="lg:text-[24px] text-[20px] font-semibold">Inclusion</h3>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-4 text-[#6A6A6A] text-left">
            {tour.inclusions && tour.inclusions.length > 0 ? (
              tour.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start justify-start md:items-center">
                  <span className="mt-[2px] mr-2 text-green-600">✓</span>
                  <p className="text-left text-[14px] lg:text-[16px]">
                    {inc.split('Superior').map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span className="text-[#0b3e63] font-bold">Superior</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))
            ) : (
              <p>Contact for inclusions details.</p>
            )}
          </div>
        </div>
      </div>

      {/* Itinerary Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {tour.days.map((day, index) => (
              <AccordionItem key={index} value={`day-${index}`} className="border-none">
                <AccordionTrigger className="hover:no-underline py-4 px-0">
                  <div className="flex items-center text-left">
                    <div className="w-[12px] h-[12px] rounded-full ring-8 ring-slate-100 lg:mr-6 mr-4 bg-green-500"></div>
                    <div>
                      <p className="lg:text-[20px] text-[14px] mr-2 min-w-[50px]">Day {index + 1}</p>
                    </div>
                    <div>
                      <h2 className="lg:text-[30px] text-[20px] font-semibold leading-[1.2] ml-4">
                        {day.title.replace(/Day \d+[:\s\-]*/i, '')}
                      </h2>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-4 md:pl-12 border-l-2 border-slate-100 ml-1.5 md:ml-3">
                  <div className="py-4 text-[#6A6A6A] text-justify whitespace-pre-wrap">
                    {day.description}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {tour.mapImage && (
            <div className="mt-8">
              <h3 className="lg:text-[24px] text-[20px] font-semibold mb-4">Trip Journey Map</h3>
              <div className="w-full relative h-[300px] md:h-[500px] rounded-[20px] overflow-hidden border border-slate-200">
                <Image
                  src={`/package maps/${tour.mapImage}`}
                  alt={`${tour.title} Map`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar / Booking Card */}
        <div className="hidden lg:block">
          <StickyBookingCard
            destination={tour.destination || 'Sri Lanka'}
            duration={`${tour.days.length} Days ${tour.days.length - 1} Nights`}
            tourType="Tailor Made"
            startingPrice={tour.startingPrice}
            inclusions={tour.inclusions}
            defaultTheme={tour.themes?.[0]}
          />
        </div>
      </div>

    </div>
  );
}
