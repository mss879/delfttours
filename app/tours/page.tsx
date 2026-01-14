'use client';

import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  Filter,
  MapPin,
  Search,
  Star,
  X,
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

type Tour = {
  id: string;
  destination: string;
  title: string;
  priceLabel: string;
  tag: string;
};

type Getaway = {
  id: string;
  destination: string;
  tag: string;
  rating: number;
  title: string;
  description: string;
  durationLabel: string;
  travelPeriod: string;
  bookBefore: string;
  priceLabel: string;
  offerLabel?: string;
};

type VacationOption = {
  id: string;
  headerTag: string;
  headerOffer?: string;
  title: string;
  priceLabel: string;
  description: string;
  bullets: string[];
  perks: { label: string; included: boolean }[];
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function FilterCheckboxRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        aria-label={label}
        className="data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
      />
      <span>{label}</span>
    </label>
  );
}

export default function ToursPage() {
  const dayMarks = useMemo(() => [3, 6, 9, 12, 15], []);
  const [days, setDays] = useState<number[]>([12]);

  const destinations = useMemo(
    () => [
      'Sri Lanka',
      'Maldives',
      'Vietnam',
      'Indonesia',
      'Dubai',
      'Cambodia',
      'Singapore',
      'Malaysia',
    ],
    []
  );
  const tripTypes = useMemo(
    () => ['Tailor Made Tours', 'Fixed Departures', 'Getaway'],
    []
  );
  const tourThemes = useMemo(
    () => [
      'Honeymoon',
      'Wildlife',
      'Golf',
      'Cycling',
      'Adventure',
      'Photography',
    ],
    []
  );
  const travellerTypes = useMemo(
    () => ['Family', 'Couple', 'Solo', 'Friends', 'Group'],
    []
  );

  const [selectedDestinations, setSelectedDestinations] = useState<
    Record<string, boolean>
  >({});
  const [selectedTripTypes, setSelectedTripTypes] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedThemes, setSelectedThemes] = useState<Record<string, boolean>>({});
  const [selectedTravellerTypes, setSelectedTravellerTypes] = useState<Record<string, boolean>>({});

  const tours: Tour[] = useMemo(
    () => [
      {
        id: '1',
        destination: 'Sri Lanka',
        title: '10 Days - Sri Lanka Dream Route',
        priceLabel: 'USD 1,500',
        tag: 'Tailor Made',
      },
      {
        id: '2',
        destination: 'Sri Lanka',
        title: '12-Day Island Adventure Awaits',
        priceLabel: 'USD 1,900',
        tag: 'Tailor Made',
      },
      {
        id: '3',
        destination: 'Sri Lanka',
        title: '14 Days - Sri Lanka Intimate Trails',
        priceLabel: 'USD 2,950',
        tag: 'Tailor Made',
      },
      {
        id: '4',
        destination: 'Vietnam',
        title: '4 Days Hanoi Tour Package',
        priceLabel: 'USD 450',
        tag: 'Tailor Made',
      },
      {
        id: '5',
        destination: 'Malaysia',
        title: '6 Days of Malaysian Magic',
        priceLabel: 'USD 630',
        tag: 'Tailor Made',
      },
      {
        id: '6',
        destination: 'Dubai',
        title: '6 Days Dubai Dreams',
        priceLabel: 'USD 870',
        tag: 'Tailor Made',
      },
    ],
    []
  );

  const getaways: Getaway[] = useMemo(
    () => [
      {
        id: 'g1',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 4,
        title: 'Triton Prestige Maafushi',
        description:
          'Triton Prestige is a stay is a newly built 4-star beachfront hotel, featuring modern facilities and... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '575',
      },
      {
        id: 'g2',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 4,
        title: 'Local Island Stay',
        description:
          'Maafushi island is one of the most popular local islands in the Maldives, known for its affordability... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '625',
      },
      {
        id: 'g3',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 4,
        title: 'Cinnamon Dhonveli',
        description:
          'Nestled in the heart of the Indian Ocean, Cinnamon Dhonveli Maldives offers a tropical paradise where... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '830',
      },
      {
        id: 'g4',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 5,
        title: 'Hard Rock Maldives',
        description:
          'A melody you can’t shake, and a tropical experience you won’t forget into the entire... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '835',
      },
      {
        id: 'g5',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 5,
        title: 'Grand Park Kodhipparu Maldives',
        description:
          'Grand Park Kodhipparu, Maldives, a luxury resort in the North Male Atoll, a short speedboat ride from... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '1,150',
        offerLabel: 'Special offer - 40%',
      },
      {
        id: 'g6',
        destination: 'Maldives',
        tag: 'Getaway',
        rating: 4,
        title: 'Meeru Island Resort',
        description:
          'Maldives hospitality industry. Discover the original Maldivian culture around the island including a... ',
        durationLabel: '4 Days 3 Nights',
        travelPeriod: 'Travel From Oct 1 - Dec 20, 2025',
        bookBefore: 'Book before: Nov 30, 2025',
        priceLabel: '1,198',
      },
    ],
    []
  );

  const vacationOptions: VacationOption[] = useMemo(
    () => [
      {
        id: 'v1',
        headerTag: 'Best Selling',
        title: 'Flexible Individual Travel',
        priceLabel: 'USD 500',
        description:
          'Perfect for families who want to travel with privacy, need full flexibility, and have specific requirements.',
        bullets: [
          'Private Trip',
          'Fully customised',
          'Private vehicle and driver',
          'Flexibility during travelling',
        ],
        perks: [
          { label: 'Dedicated Destination Expert', included: true },
          { label: '24/7 global care', included: true },
          { label: 'Account Manager', included: true },
        ],
      },
      {
        id: 'v2',
        headerTag: 'Group Adventure',
        headerOffer: '20% Off',
        title: 'Small Group Tours',
        priceLabel: 'USD 602',
        description:
          'Ideal for those who love travelling in small groups, and have less flexibility during their travels and dates.',
        bullets: [
          'Travelling with small groups of up to 16 people',
          'A fixed tour plan and fixed dates',
          'Shared transport',
          'No flexibility during travelling',
        ],
        perks: [
          { label: 'Dedicated Destination Expert', included: true },
          { label: '24/7 global care', included: true },
          { label: 'Account Manager', included: false },
        ],
      },
      {
        id: 'v3',
        headerTag: 'Ultimate Relaxing',
        headerOffer: '30% Off',
        title: 'Holiday Getaways',
        priceLabel: 'USD 374',
        description:
          'Ideal for those who have flexible travel schedules, seeking discounted getaways, offering reduced prices and shorter travel distances.',
        bullets: [
          'Private Trip',
          'Fixed travel period',
          'Private vehicle and driver',
          'Flexibility during travelling',
          'Discounted prices and offers',
        ],
        perks: [
          { label: 'Dedicated Destination Expert', included: false },
          { label: '24/7 global care', included: true },
          { label: 'Account Manager', included: false },
        ],
      },
    ],
    []
  );

  const faqItems: FaqItem[] = useMemo(
    () => [
      {
        id: 'f1',
        question: 'Where is Olanka Travels located ?',
        answer:
          'Olanka Travels is located in Sri Lanka, at 87 Dutugemunu St, Dehiwala-Mount Lavinia.',
      },
      {
        id: 'f2',
        question: 'What are the countries to which I can Fly with Olanka travels?',
        answer:
          'We offer trips across multiple destinations. Share your preferred country or travel style and we will guide you to the best options.',
      },
      {
        id: 'f3',
        question: 'How do I book a tour with Olanka?',
        answer:
          'You can request a quote and our team will contact you to confirm dates, itinerary, and payment details.',
      },
      {
        id: 'f4',
        question: 'What are the general timings look like, when I book with Olanka?',
        answer:
          'Timings depend on your itinerary. Once you share your dates and preferences, we will confirm a detailed schedule.',
      },
    ],
    []
  );

  const [faqQuery, setFaqQuery] = useState('');
  const visibleFaqItems = useMemo(() => {
    const normalizedQuery = faqQuery.trim().toLowerCase();
    if (!normalizedQuery) return faqItems;
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery)
    );
  }, [faqItems, faqQuery]);

  const filterContent = (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Number of Days</h2>
        <div className="px-1">
          <Slider
            value={days}
            onValueChange={setDays}
            min={3}
            max={15}
            step={1}
            aria-label="Number of days"
            className="cursor-pointer"
          />
          <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
            {dayMarks.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/50 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Destination</h2>
        <div className="mt-4 space-y-3">
          {destinations.map((destination) => (
            <FilterCheckboxRow
              key={destination}
              label={destination}
              checked={selectedDestinations[destination] === true}
              onCheckedChange={(checked) =>
                setSelectedDestinations((prev) => ({
                  ...prev,
                  [destination]: checked,
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/50 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Trip Type</h2>
        <div className="mt-4 space-y-3">
          {tripTypes.map((type) => (
            <FilterCheckboxRow
              key={type}
              label={type}
              checked={selectedTripTypes[type] === true}
              onCheckedChange={(checked) =>
                setSelectedTripTypes((prev) => ({
                  ...prev,
                  [type]: checked,
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/50 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Who&apos;s Travelling</h2>
        <div className="mt-4 space-y-3">
          {travellerTypes.map((type) => (
            <FilterCheckboxRow
              key={type}
              label={type}
              checked={selectedTravellerTypes[type] === true}
              onCheckedChange={(checked) =>
                setSelectedTravellerTypes((prev) => ({
                  ...prev,
                  [type]: checked,
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/50 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Tour Theme</h2>
        <div className="mt-4 space-y-3">
          {tourThemes.map((theme) => (
            <FilterCheckboxRow
              key={theme}
              label={theme}
              checked={selectedThemes[theme] === true}
              onCheckedChange={(checked) =>
                setSelectedThemes((prev) => ({
                  ...prev,
                  [theme]: checked,
                }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tours <span className="text-black">&amp; Destinations</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the world with our premium, curated travel experiences.
          </p>
        </div>

        <div className="mt-8 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full rounded-full border-slate-300 bg-white/60 backdrop-blur-md h-12 text-base font-medium text-slate-700 shadow-sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto bg-white/95 backdrop-blur-xl">
              <div className="mt-6">
                {filterContent}
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <SheetClose asChild>
                    <Button className="w-full rounded-full h-12 text-base shadow-md">Close Filters</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <section className="mt-8 lg:mt-12 grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="rounded-3xl border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl ring-1 ring-black/5">
                {filterContent}
              </Card>
            </div>
          </aside>

          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              <span className="font-bold">Tailor</span> <span className="font-normal text-slate-500">Made Tours</span>
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="group overflow-hidden rounded-3xl border-white/40 bg-white/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/80"
                >
                  <div className="p-4">
                    <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-2xl">
                      <div className="h-full w-full bg-slate-200 transition-transform duration-500 group-hover:scale-105" />
                    </AspectRatio>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        <span className="text-slate-700">{tour.destination}</span>
                      </div>
                      <Badge variant="secondary" className="rounded-full bg-white/50 px-3 font-normal text-slate-700 backdrop-blur-sm">
                        {tour.tag}
                      </Badge>
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tour.title}
                    </h3>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="text-xs text-slate-500">
                        <div className="font-medium">Starting From</div>
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {tour.priceLabel}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button className="h-12 rounded-full px-10 text-base shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">Load More</Button>
            </div>

            <section className="mt-20">
              <h2 className="text-3xl font-semibold text-slate-900">
                <span className="font-bold">Getaway</span>{' '}
                <span className="font-normal text-slate-500">Holidays</span>
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {getaways.map((getaway) => (
                  <Card
                    key={getaway.id}
                    className="group overflow-hidden rounded-3xl border-white/40 bg-white/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/80"
                  >
                    <div className="p-4">
                      <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-2xl">
                        <div className="h-full w-full bg-slate-200 transition-transform duration-500 group-hover:scale-105" />
                      </AspectRatio>

                      <div className="mt-5 flex items-center justify-between gap-2">
                        <div className="text-xs font-medium text-slate-500">
                          <span className="text-slate-700">{getaway.destination}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="rounded-full bg-white/50 px-2.5 font-normal text-slate-700 backdrop-blur-sm">
                            {getaway.tag}
                          </Badge>
                          <div className="flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-0.5 text-xs font-bold text-yellow-700">
                            <Star className="h-3 w-3 fill-yellow-700" aria-hidden />
                            <span>{getaway.rating}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {getaway.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {getaway.description}
                        <span className="ml-1 font-medium text-indigo-600 hover:underline cursor-pointer">
                          Show More
                        </span>
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden />
                        <span>{getaway.durationLabel}</span>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                        <div>{getaway.travelPeriod}</div>
                        <div>{getaway.bookBefore}</div>
                      </div>

                      <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                        <div className="text-[11px] text-slate-500">From USD</div>
                        <div className="text-xl font-bold text-slate-900">
                          {getaway.priceLabel}
                        </div>
                      </div>

                      {getaway.offerLabel ? (
                        <div className="mt-3">
                          <Badge className="rounded-full bg-rose-500 hover:bg-rose-600">{getaway.offerLabel}</Badge>
                        </div>
                      ) : null}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Button className="h-12 rounded-full px-10 text-base shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">Load More</Button>
              </div>
            </section>
          </div>
        </section>

        <section className="mt-24">
          <div className="space-y-3 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              3 <span className="text-indigo-600">Vacation</span>{' '}
              <span className="font-normal text-slate-500">Options</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600">
              We will provide a selection of 3 different tour types to suit your preferences
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/40 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-0 lg:grid-cols-3">
              {vacationOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={
                    index === 1
                      ? 'border-y border-white/20 bg-white/30 p-10 lg:border-x lg:border-y-0'
                      : 'p-10 hover:bg-white/20 transition-colors'
                  }
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="rounded-full bg-white/60 backdrop-blur-sm">
                      {option.headerTag}
                    </Badge>
                    {option.headerOffer ? (
                      <Badge variant="secondary" className="rounded-full bg-indigo-100 text-indigo-700">
                        {option.headerOffer}
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">
                    {option.title}
                  </h3>

                  <div className="mt-4 flex items-end gap-2 text-slate-900">
                    <span className="text-sm text-slate-600">Starting from</span>
                    <span className="text-3xl font-bold">{option.priceLabel}</span>
                    <span className="pb-1 text-xs text-slate-600">PP</span>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-slate-600">{option.description}</p>

                  <ul className="mt-8 list-disc space-y-3 pl-5 text-sm text-slate-700 marker:text-indigo-400">
                    {option.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-4">
                    {option.perks.map((perk) => (
                      <div key={perk.label} className="flex items-center gap-3">
                        {perk.included ? (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </div>
                        )}
                        <span className="text-sm text-slate-700">{perk.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <Button className="w-full rounded-full py-6 text-base shadow-md hover:shadow-lg">Get a Quote</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="rounded-[2.5rem] border border-white/40 bg-white/40 p-10 shadow-2xl backdrop-blur-xl lg:flex lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-slate-900">
                Frequently <span className="font-normal text-slate-500">Asked Questions</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Welcome to Olanka Travels! We’re excited to have you with us. For any questions you may have,
                please explore our FAQ page where you’ll find helpful answers and information.
              </p>

              <div className="mt-8">
                <div className="text-sm font-semibold text-slate-900">How Can We Help?</div>
                <div className="relative mt-4">
                  <Input
                    value={faqQuery}
                    onChange={(e) => setFaqQuery(e.target.value)}
                    placeholder="Ask a question"
                    className="h-12 rounded-full border-white/40 bg-white/60 pl-12 shadow-sm backdrop-blur-sm focus:bg-white transition-all"
                    aria-label="Search FAQs"
                  />
                  <Search
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="h-64 w-64 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-inner" aria-hidden />
            </div>
          </div>

          <div className="mt-10">
            <Card className="rounded-[2rem] border-white/40 bg-white/60 p-4 shadow-lg backdrop-blur-xl">
              <div className="px-4 py-2">
                <Accordion type="single" collapsible>
                  {visibleFaqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-slate-200/60">
                      <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline hover:text-indigo-600 transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed text-slate-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Card>

            <div className="mt-10 flex justify-center">
              <Button className="h-12 rounded-full px-10 text-base shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">Show More</Button>
            </div>
          </div>
        </section>

        <section className="mt-24 pb-12">
          <div className="rounded-[2.5rem] border border-white/40 bg-white/40 px-6 py-16 shadow-2xl backdrop-blur-xl lg:px-16">
            <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">
                  Get a <span className="font-normal text-slate-500">Quote</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                  Our dedicated team of local experts are available 24/7, ready to provide assistance whenever you need it
                </p>

                <Card className="mt-10 rounded-3xl border-white/40 bg-white/80 p-8 shadow-xl backdrop-blur-md">
                  <form className="grid gap-6 lg:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</div>
                      <Input placeholder="John Jackson" className="h-11 rounded-xl border-slate-200 bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</div>
                      <Input placeholder="Hello@outlook.com" type="email" className="h-11 rounded-xl border-slate-200 bg-white/50" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination</div>
                      <Select>
                        <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white/50">
                          <SelectValue placeholder="Select a Destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                          <SelectItem value="maldives">Maldives</SelectItem>
                          <SelectItem value="vietnam">Vietnam</SelectItem>
                          <SelectItem value="malaysia">Malaysia</SelectItem>
                          <SelectItem value="dubai">Dubai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</div>
                      <Input placeholder="+1" className="h-11 rounded-xl border-slate-200 bg-white/50" />
                    </div>

                    <div className="lg:col-span-2 mt-4">
                      <div className="flex flex-wrap items-center gap-6">
                        <Button className="h-12 rounded-full px-12 text-base shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">Submit</Button>
                        <button
                          type="button"
                          className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline hover:text-indigo-600 transition-colors"
                        >
                          Have a coupon?
                        </button>
                      </div>
                    </div>
                  </form>
                </Card>

                <p className="mt-8 text-sm font-medium text-slate-500">
                  We guarantee that your information will not be shared with any third parties
                </p>
              </div>

              <div className="hidden lg:block">
                <div className="h-96 w-96 rounded-[3rem] bg-gradient-to-tr from-indigo-200 to-cyan-100 shadow-inner opacity-80" aria-hidden />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
