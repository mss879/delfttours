"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    Filter,
    MapPin,
    Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { tourDetails, TourDetail } from "@/app/tours/tour-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import TourDetailContent from "@/components/TourDetailContent";
import { useCurrency } from "@/components/CurrencyProvider";
import FAQSection from "@/components/FAQSection";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SuccessModal from "@/components/SuccessModal";

// Types
type Tour = {
    id: string;
    destination: string;
    title: string;
    priceLabel: string;
    tag: string;
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

export default function TourListing() {
    const [days, setDays] = useState<number[]>([21]);
    const { convertPrice } = useCurrency();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const destinations = useMemo(
        () => [
            "Sri Lanka",
            "Maldives",
            "Vietnam",
            "Indonesia",
            "Dubai",
            "Cambodia",
            "Singapore",
            "Malaysia",
        ],
        []
    );
    const tripTypes = useMemo(
        () => ["Tailor Made Tours", "Fixed Departures", "Getaway"],
        []
    );
    const tourThemes = useMemo(
        () => [
            "Culture & Heritage",
            "Wildlife & Nature",
            "Beach & Relax",
            "Hill Country",
            "Honeymoon",
            "Golf",
            "Cycling",
            "Adventure",
            "Photography",
        ],
        []
    );
    const travellerTypes = useMemo(
        () => ["Family", "Couple", "Solo", "Friends", "Group"],
        []
    );

    const activities = useMemo(
        () => [
            "Safari",
            "Whale Watching",
            "Tea Factory Visit",
            "Train Ride",
            "City Tour",
            "Hiking/Trekking",
            "Snorkeling/Diving",
            "Cultural Show",
            "Boat Ride",
            "Cooking Class",
        ],
        []
    );

    const [selectedDestinations, setSelectedDestinations] = useState<
        Record<string, boolean>
    >({});
    const [selectedTripTypes, setSelectedTripTypes] = useState<
        Record<string, boolean>
    >({});
    const [selectedThemes, setSelectedThemes] = useState<Record<string, boolean>>(
        {}
    );
    const [selectedTravellerTypes, setSelectedTravellerTypes] = useState<
        Record<string, boolean>
    >({});
    const [selectedActivities, setSelectedActivities] = useState<
        Record<string, boolean>
    >({});

    // Filter Logic
    const filteredTours = useMemo(() => {
        return tourDetails.filter((tour) => {
            // 1. Duration Filter (Slider)
            if (tour.days.length > days[0]) return false;

            // 2. Destination Filter
            const activeDestinations = Object.entries(selectedDestinations)
                .filter(([_, v]) => v)
                .map(([k]) => k);
            if (activeDestinations.length > 0) {
                if (!activeDestinations.some((d) => d === "Sri Lanka")) return false;
            }

            // 3. Theme Filter
            const activeThemes = Object.entries(selectedThemes)
                .filter(([_, v]) => v)
                .map(([k]) => k);
            if (activeThemes.length > 0) {
                const tourThemes = tour.themes || [];
                const hasMatch = activeThemes.some((theme) =>
                    tourThemes.includes(theme)
                );
                if (!hasMatch) return false;
            }

            // 4. Activity Filter
            const activeActivities = Object.entries(selectedActivities)
                .filter(([_, v]) => v)
                .map(([k]) => k);
            if (activeActivities.length > 0) {
                const tourActivities = tour.activities || [];
                const hasMatch = activeActivities.some((a) =>
                    tourActivities.includes(a)
                );
                if (!hasMatch) return false;
            }

            return true;
        });
    }, [days, selectedDestinations, selectedThemes, selectedActivities]);

    // Derived state for display
    const displayTours = useMemo(
        () =>
            filteredTours.map((tour) => ({
                id: tour.id,
                destination: "Sri Lanka",
                title: tour.title,
                priceLabel: tour.startingPrice || "Contact Us",
                tag: tour.days.length + " Days",
                detail: tour,
            })),
        [filteredTours]
    );

    return (
        <>
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Quote Requested!"
                message="Thank you for your interest. Our agents will contact you shortly with a personalized quote."
            />

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
                                <Button
                                    variant="outline"
                                    className="rounded-full border-slate-300 bg-white hover:bg-slate-50 h-9"
                                >
                                    Duration
                                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-800">
                                        {days[0] < 21 ? `< ${days[0]}` : "Any"}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-6" align="start">
                                <div className="space-y-4">
                                    <h4 className="font-medium leading-none">Trip Duration</h4>
                                    <p className="text-sm text-slate-500">
                                        How many days do you have?
                                    </p>
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
                                            <span className="font-bold text-indigo-600">
                                                {days[0]} Days
                                            </span>
                                            <span className="text-slate-500">Max: 21</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 2. DESTINATIONS */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedDestinations).some(Boolean)
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Destinations
                                    {Object.values(selectedDestinations).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold">
                                            {
                                                Object.values(selectedDestinations).filter(Boolean)
                                                    .length
                                            }
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
                                            onCheckedChange={(c) =>
                                                setSelectedDestinations((prev) => ({
                                                    ...prev,
                                                    [dest]: c,
                                                }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 3. THEMES */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedThemes).some(Boolean)
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                        : "bg-white"
                                        }`}
                                >
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
                                            onCheckedChange={(c) =>
                                                setSelectedThemes((prev) => ({ ...prev, [theme]: c }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 4. ACTIVITIES (NEW) */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedActivities).some(Boolean)
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                        : "bg-white"
                                        }`}
                                >
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
                                            onCheckedChange={(c) =>
                                                setSelectedActivities((prev) => ({ ...prev, [act]: c }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 5. TRIP TYPES */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedTripTypes).some(Boolean)
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                        : "bg-white"
                                        }`}
                                >
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
                                            onCheckedChange={(c) =>
                                                setSelectedTripTypes((prev) => ({ ...prev, [type]: c }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 6. TRAVELLERS */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedTravellerTypes).some(Boolean)
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                        : "bg-white"
                                        }`}
                                >
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
                                            onCheckedChange={(c) =>
                                                setSelectedTravellerTypes((prev) => ({
                                                    ...prev,
                                                    [type]: c,
                                                }))
                                            }
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
                            <span className="font-bold">Tailor</span>{" "}
                            <span className="font-normal text-slate-500">Made Tours</span>
                        </h2>
                        <p className="mt-2 text-slate-600">
                            {filteredTours.length} Experiences Found
                        </p>
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
                                                {(fullDetail.themes || []).slice(0, 0).map((theme) => (
                                                    <Badge
                                                        key={theme}
                                                        variant="secondary"
                                                        className="bg-indigo-500/90 text-white backdrop-blur-md border-none px-3 py-1 text-xs font-bold uppercase tracking-wider"
                                                    >
                                                        {theme}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Book Now Button (Replaces Wishlist) */}
                                            <div className="absolute top-4 right-4 z-10">
                                                <a
                                                    href={`/tours/${tour.id}/checkout`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-1.5 bg-green-600/90 hover:bg-green-700 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                                                >
                                                    <span>Book Now</span>
                                                </a>
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
                                                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                                                        Starting from
                                                    </span>
                                                    <span className="text-sm font-bold text-slate-900">
                                                        {convertPrice(tour.detail?.startingPrice)}
                                                    </span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="rounded-full px-5 bg-slate-900 group-hover:bg-indigo-600 transition-colors"
                                                >
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
        </>
    );
}
