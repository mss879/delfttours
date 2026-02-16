'use client';
import Image from 'next/image';

import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  Filter,
  MapPin,
  Star,
  X,
  Palmtree,
  Mountain,
  Landmark,
  Camera,
  Users,
  Heart,
  GanttChartSquare,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

import { tourDetails, TourDetail } from './tour-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import TourDetailContent from '@/components/TourDetailContent';
import { useCurrency } from '@/components/CurrencyProvider';
import FAQSection from '@/components/FAQSection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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



// Filter Option Helper Component
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

import SuccessModal from '@/components/SuccessModal';

export default function ToursPage() {
  const [days, setDays] = useState<number[]>([21]);
  const { toast } = useToast();
  const { convertPrice } = useCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: ''
  });

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
  // Enhanced themes based on user feedback
  const tourThemes = useMemo(
    () => [
      'Culture & Heritage',
      'Wildlife & Nature',
      'Beach & Relax',
      'Hill Country',
      'Honeymoon',
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

  const activities = useMemo(
    () => [
      'Safari',
      'Whale Watching',
      'Tea Factory Visit',
      'Train Ride',
      'City Tour',
      'Hiking/Trekking',
      'Snorkeling/Diving',
      'Cultural Show',
      'Boat Ride',
      'Cooking Class',
    ],
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
  const [selectedActivities, setSelectedActivities] = useState<Record<string, boolean>>({});

  // Helper to determine categories for a tour (used for auto-tagging if data is missing)
  function getTourCategories(tour: TourDetail): string[] {
    const text = (tour.title + ' ' + tour.description + ' ' + (tour.inclusions?.join(' ') || '') + ' ' + tour.days.map(d => d.title + ' ' + d.description).join(' ')).toLowerCase();
    const cats = [];

    // Logic for tourThemes
    if (text.match(/temple|kandy|sigiriya|dambulla|anuradhapura|polonnaruwa|culture|heritage|ancient|history|buddhist|kataragama|mihintale/)) cats.push('Culture & Heritage');
    if (text.match(/safari|wild|elephant|yala|udawalawe|nature|park|leopard|bird|wilpattu|minneriya|kaudulla|national park/)) cats.push('Wildlife & Nature');
    if (text.match(/beach|sea|ocean|coast|bentota|mirissa|galle|hikkaduwa|swim|surf|trincomalee|negombo|pasikuda|nilaveli|tangalle|arugam bay/)) cats.push('Beach & Relax');
    if (text.match(/tea|nuwara eliya|ella|mountain|hill|scenic train|waterfall|haputale|horton plains|knuckles/)) cats.push('Hill Country');
    if (text.match(/honeymoon|romantic|couple/)) cats.push('Honeymoon');
    if (text.match(/adventure|hike|trek|rafting|zip line/)) cats.push('Adventure');

    // Default fallback if strictly matched
    return cats;
  }



  // Filter Logic
  const filteredTours = useMemo(() => {
    return tourDetails.filter(tour => {
      // 1. Duration Filter (Slider)
      if (tour.days.length > days[0]) return false;

      // 2. Destination Filter
      const activeDestinations = Object.entries(selectedDestinations).filter(([_, v]) => v).map(([k]) => k);
      if (activeDestinations.length > 0) {
        const isSriLanka = true;
        if (!activeDestinations.some(d => d === 'Sri Lanka')) return false;
      }

      // 3. Theme Filter
      const activeThemes = Object.entries(selectedThemes).filter(([_, v]) => v).map(([k]) => k);
      if (activeThemes.length > 0) {
        // console.log('Active Themes:', activeThemes);
        const tourThemes = tour.themes || [];
        // console.log('Tour Themes:', tour.title, tourThemes);
        const hasMatch = activeThemes.some(theme => tourThemes.includes(theme));
        if (!hasMatch) return false;
      }

      // 4. Activity Filter
      const activeActivities = Object.entries(selectedActivities).filter(([_, v]) => v).map(([k]) => k);
      if (activeActivities.length > 0) {
        const tourActivities = tour.activities || [];
        const hasMatch = activeActivities.some(a => tourActivities.includes(a));
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [days, selectedDestinations, selectedThemes, selectedActivities]); // TripType and TravellerType ignored for now as we lack data field

  // Derived state for display
  const displayTours = useMemo(() => filteredTours.map(tour => ({
    id: tour.id,
    destination: 'Sri Lanka',
    title: tour.title,
    priceLabel: tour.startingPrice || 'Contact Us',
    tag: tour.days.length + ' Days',
    detail: tour
  })), [filteredTours]);



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





  // Filters moved to inline popovers


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Quote Requested!"
        message="Thank you for your interest. Our agents will contact you shortly with a personalized quote."
      />

      <main className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tours <span className="text-black">&amp; Destinations</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover the world with our premium, curated travel experiences.
          </p>
        </div>

        {/* TOP FILTER BAR - DESKTOP & MOBILE */}
        <div className="sticky top-20 z-40 mt-8 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg backdrop-blur-xl transition-all">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 mr-2 text-sm font-medium text-slate-500">
                <Filter className="h-4 w-4" />
                <span>Filters:</span>
              </div>

              {/* 1. DURATION */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="rounded-full border-slate-300 bg-white hover:bg-slate-50 h-9">
                    Duration
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-800">
                      {days[0] < 21 ? `< ${days[0]}` : 'Any'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-6" align="start">
                  <div className="space-y-4">
                    <h4 className="font-medium leading-none">Trip Duration</h4>
                    <p className="text-sm text-slate-500">How many days do you have?</p>
                    <div className="pt-4">
                      <Slider
                        value={days}
                        onValueChange={setDays}
                        min={3}
                        max={21}
                        step={1}
                        className="cursor-pointer"
                      />
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Min: 3</span>
                        <span className="font-bold text-indigo-600">{days[0]} Days</span>
                        <span className="text-slate-500">Max: 21</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* 2. DESTINATIONS */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`rounded-full border-slate-300 h-9 ${Object.values(selectedDestinations).some(Boolean) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white'}`}>
                    Destinations
                    {Object.values(selectedDestinations).some(Boolean) && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold">
                        {Object.values(selectedDestinations).filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium">Destinations</h4>
                    {destinations.map((dest) => (
                      <FilterCheckboxRow
                        key={dest}
                        label={dest}
                        checked={selectedDestinations[dest] === true}
                        onCheckedChange={(c) => setSelectedDestinations(prev => ({ ...prev, [dest]: c }))}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 3. THEMES */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`rounded-full border-slate-300 h-9 ${Object.values(selectedThemes).some(Boolean) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white'}`}>
                    Themes
                    {Object.values(selectedThemes).some(Boolean) && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold">
                        {Object.values(selectedThemes).filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium">Travel Theme</h4>
                    {tourThemes.map((theme) => (
                      <FilterCheckboxRow
                        key={theme}
                        label={theme}
                        checked={selectedThemes[theme] === true}
                        onCheckedChange={(c) => setSelectedThemes(prev => ({ ...prev, [theme]: c }))}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 4. ACTIVITIES (NEW) */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`rounded-full border-slate-300 h-9 ${Object.values(selectedActivities).some(Boolean) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white'}`}>
                    Activities
                    {Object.values(selectedActivities).some(Boolean) && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold">
                        {Object.values(selectedActivities).filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium">Activities</h4>
                    {activities.map((act) => (
                      <FilterCheckboxRow
                        key={act}
                        label={act}
                        checked={selectedActivities[act] === true}
                        onCheckedChange={(c) => setSelectedActivities(prev => ({ ...prev, [act]: c }))}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 5. TRIP TYPES */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`rounded-full border-slate-300 h-9 ${Object.values(selectedTripTypes).some(Boolean) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white'}`}>
                    Style
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium">Trip Style</h4>
                    {tripTypes.map((type) => (
                      <FilterCheckboxRow
                        key={type}
                        label={type}
                        checked={selectedTripTypes[type] === true}
                        onCheckedChange={(c) => setSelectedTripTypes(prev => ({ ...prev, [type]: c }))}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* 6. TRAVELLERS */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`rounded-full border-slate-300 h-9 ${Object.values(selectedTravellerTypes).some(Boolean) ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white'}`}>
                    Travellers
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-3">
                    <h4 className="font-medium">Who is travelling?</h4>
                    {travellerTypes.map((type) => (
                      <FilterCheckboxRow
                        key={type}
                        label={type}
                        checked={selectedTravellerTypes[type] === true}
                        onCheckedChange={(c) => setSelectedTravellerTypes(prev => ({ ...prev, [type]: c }))}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-red-600"
                  onClick={() => {
                    setDays([21]);
                    setSelectedDestinations({});
                    setSelectedThemes({});
                    setSelectedActivities({});
                    setSelectedTripTypes({});
                    setSelectedTravellerTypes({});
                  }}
                >
                  Clear All
                </Button>
              </div>

            </div>

            {/* Active Filter Chips (Summary) */}
            <div className="mt-3 flex flex-wrap gap-2 empty:hidden">
              {/* We can show summary chips here if needed, but the buttons are already highlighted */}
            </div>

          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                <span className="font-bold">Tailor</span> <span className="font-normal text-slate-500">Made Tours</span>
              </h2>
              <p className="mt-2 text-slate-600">{filteredTours.length} Experiences Found</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


            {displayTours.map((tour) => {
              const fullDetail = tour.detail;
              if (!fullDetail) return null;
              return (
                <Dialog key={tour.id}>
                  <DialogTrigger asChild>
                    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-slate-100">

                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                          <Badge className="bg-white/90 text-slate-900 backdrop-blur-md hover:bg-white shadow-sm border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            {tour.tag}
                          </Badge>
                          {(fullDetail.themes || []).slice(0, 0).map(theme => (
                            <Badge key={theme} variant="secondary" className="bg-indigo-500/90 text-white backdrop-blur-md border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                              {theme}
                            </Badge>
                          ))}
                        </div>

                        {/* Wishlist Button (Visual Only) */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                            <Heart className="w-5 h-5" />
                          </div>
                        </div>

                        {fullDetail.images && fullDetail.images.length > 0 ? (
                          <Image
                            src={fullDetail.images[0]}
                            alt={fullDetail.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" />
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{tour.destination}</span>
                          </div>
                          <h3 className="line-clamp-2 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                            {tour.title}
                          </h3>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Starting from</span>
                            <span className="text-sm font-bold text-slate-900">{convertPrice(tour.detail?.startingPrice)}</span>
                          </div>
                          <Button size="sm" className="rounded-full px-5 bg-slate-900 group-hover:bg-indigo-600 transition-colors">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>

                  {/* WIDENED POPUP */}
                  <DialogContent className="max-w-6xl w-[95vw] h-[90vh] overflow-y-auto p-0 rounded-3xl border-none">
                    <div className="p-6 md:p-10 lg:p-12">
                      <TourDetailContent tour={fullDetail} />
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

        </section>



        <FAQSection />

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
                  <form className="grid gap-6 lg:grid-cols-2" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);

                    try {
                      const nameParts = formData.fullName.trim().split(' ');
                      const firstName = nameParts[0] || '';
                      const lastName = nameParts.slice(1).join(' ') || '';
                      const message = `Inquiry for destination: ${formData.destination}`;

                      await emailjs.send(
                        'service_bh4m7kr',
                        'template_6qzswnb',
                        {
                          firstName,
                          lastName,
                          email: formData.email,
                          phone: formData.phone,
                          message,
                        },
                        'ZvEmfrY7ik6bouEZH'
                      );

                      setShowSuccessModal(true);
                      setFormData({ fullName: '', email: '', phone: '', destination: '' });
                    } catch (error) {
                      console.error('EmailJS Error:', error);
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to send request. Please try again.",
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</div>
                      <Input
                        placeholder="John Jackson"
                        className="h-11 rounded-xl border-slate-200 bg-white/50"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</div>
                      <Input
                        placeholder="Hello@outlook.com"
                        type="email"
                        className="h-11 rounded-xl border-slate-200 bg-white/50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination</div>
                      <Select value={formData.destination} onValueChange={(val) => setFormData({ ...formData, destination: val })}>
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
                      <Input
                        placeholder="+1"
                        className="h-11 rounded-xl border-slate-200 bg-white/50"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="lg:col-span-2 mt-4">
                      <div className="flex flex-wrap items-center gap-6">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 rounded-full px-12 text-base shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all"
                        >
                          {isSubmitting ? 'Sending...' : 'Submit'}
                        </Button>
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
