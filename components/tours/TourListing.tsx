"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    Filter,
    MapPin,
} from "lucide-react";

import { tourDetails, TourDetail } from "@/app/tours/tour-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import Link from "next/link";

import { useCurrency } from "@/components/CurrencyProvider";
import TourFaqSection from "@/components/tours/TourFaqSection";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SuccessModal from "@/components/SuccessModal";

// Filter Option Helper Component
function FilterCheckboxRow({
    label,
    checked,
    onCheckedChange,
    count,
}: {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    /** Tours this option would yield given the other active filters. */
    count: number;
}) {
    // A zero-result option stays visible (so the facet list doesn't jump around
    // as you tick boxes) but is greyed out and unclickable — picking it could
    // only ever empty the grid.
    const disabled = count === 0 && !checked;

    return (
        <label className={`flex items-center justify-between gap-3 text-sm transition-colors ${disabled ? 'cursor-not-allowed opacity-40 text-slate-400' : 'cursor-pointer text-slate-600 hover:text-slate-900'}`}>
            <span className="flex items-center gap-3">
                <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => !disabled && onCheckedChange(value === true)}
                    disabled={disabled}
                    aria-label={label}
                    className="data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                />
                <span>{label}</span>
            </span>
            <span className="tabular-nums text-xs text-slate-500">{count}</span>
        </label>
    );
}

type FacetKey = "countries" | "destinations" | "themes" | "religions" | "activities";

// Preferred display order. Anything present in the data but not listed here still
// gets shown (appended, alphabetical) — the data is the source of truth, this only
// controls ordering.
const FACET_ORDER: Record<FacetKey, string[]> = {
    // The regional add-on countries Delft Tours sells alongside Sri Lanka. Every
    // packaged tour today is Sri Lanka only, so the rest sit at 0 — see ALWAYS_SHOW.
    countries: [
        "Sri Lanka",
        "Maldives",
        "Vietnam",
        "Indonesia",
        "Dubai",
        "Cambodia",
        "Singapore",
        "Malaysia",
    ],
    // Roughly west coast -> cultural triangle -> hill country -> south -> east.
    destinations: [
        "Colombo",
        "Negombo",
        "Pinnawala",
        "Sigiriya",
        "Dambulla",
        "Habarana",
        "Minneriya",
        "Polonnaruwa",
        "Anuradhapura",
        "Wilpattu",
        "Kandy",
        "Nuwara Eliya",
        "Ella",
        "Haputale",
        "Horton Plains",
        "Yala",
        "Udawalawe",
        "Kalutara",
        "Bentota",
        "Hikkaduwa",
        "Galle",
        "Weligama",
        "Mirissa",
        "Tangalle",
        "Hambantota",
        "Trincomalee",
    ],
    themes: [
        "Culture & Heritage",
        "Wildlife & Nature",
        "Beach & Relax",
        "Hill Country",
        "Honeymoon",
        "Adventure",
    ],
    religions: ["Buddhism", "Hinduism", "Islam", "Christianity"],
    activities: [
        "Safari",
        "Whale Watching",
        "Tea Factory Visit",
        "Train Ride",
        "City Tour",
        "Hiking/Trekking",
        "Snorkeling/Diving",
        "Cultural Show",
        "Boat Ride",
        "Nature Trails",
        "Bird Watching",
        "Cooking Class",
        "Adams Peak",
        "Heritage",
    ],
};

// Facets whose full option list is shown even where no tour matches. Country is
// the deliberate exception to the derive-from-data rule below: Delft Tours sells
// these regional add-ons, so they stay visible (greyed out at 0 by
// FilterCheckboxRow) as a signal of the offering rather than vanishing.
const ALWAYS_SHOW: FacetKey[] = ["countries"];

// Every other facet's options are derived from the tour data rather than
// hardcoded, so the UI can never again advertise a facet no tour carries (the old
// list offered Golf, Cycling, Photography and "Adams Peak" — each matched 0 tours
// and silently blanked the grid).
function buildOptions(key: FacetKey): string[] {
    if (ALWAYS_SHOW.includes(key)) return FACET_ORDER[key];
    const present = new Set<string>();
    tourDetails.forEach((tour) => (tour[key] || []).forEach((v) => present.add(v)));
    const ordered = FACET_ORDER[key].filter((o) => present.has(o));
    const extras = Array.from(present)
        .filter((p) => !FACET_ORDER[key].includes(p))
        .sort();
    return [...ordered, ...extras];
}

const selectedList = (sel: Record<string, boolean>) =>
    Object.entries(sel)
        .filter(([, v]) => v)
        .map(([k]) => k);

export default function TourListing() {
    const { convertPrice } = useCurrency();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Longest tour actually in the catalogue. The slider used to run to a
    // hardcoded 21 while the longest tour is 15 days, leaving six dead notches.
    const maxDays = useMemo(
        () => tourDetails.reduce((m, t) => Math.max(m, t.days.length), 0),
        []
    );
    const minDays = useMemo(
        () => tourDetails.reduce((m, t) => Math.min(m, t.days.length), Infinity),
        []
    );

    const [days, setDays] = useState<number[]>([maxDays]);

    const countries = useMemo(() => buildOptions("countries"), []);
    const destinations = useMemo(() => buildOptions("destinations"), []);
    const tourThemes = useMemo(() => buildOptions("themes"), []);
    const religions = useMemo(() => buildOptions("religions"), []);
    const activities = useMemo(() => buildOptions("activities"), []);

    const [selectedCountries, setSelectedCountries] = useState<
        Record<string, boolean>
    >({});
    const [selectedDestinations, setSelectedDestinations] = useState<
        Record<string, boolean>
    >({});
    const [selectedThemes, setSelectedThemes] = useState<Record<string, boolean>>(
        {}
    );
    const [selectedActivities, setSelectedActivities] = useState<
        Record<string, boolean>
    >({});
    const [selectedReligions, setSelectedReligions] = useState<
        Record<string, boolean>
    >({});

    const activeCountries = useMemo(
        () => selectedList(selectedCountries),
        [selectedCountries]
    );
    const activeDestinations = useMemo(
        () => selectedList(selectedDestinations),
        [selectedDestinations]
    );
    const activeThemes = useMemo(() => selectedList(selectedThemes), [selectedThemes]);
    const activeReligions = useMemo(
        () => selectedList(selectedReligions),
        [selectedReligions]
    );
    const activeActivities = useMemo(
        () => selectedList(selectedActivities),
        [selectedActivities]
    );

    // One predicate, reused for both the result set and the per-option counts.
    // `skip` omits a facet so that facet's own counts stay stable while you tick
    // boxes inside it (standard faceted-search behaviour).
    const matches = useMemo(
        () =>
            (tour: TourDetail, skip?: FacetKey) => {
                if (tour.days.length > days[0]) return false;

                const check = (key: FacetKey, active: string[]) => {
                    if (skip === key || active.length === 0) return true;
                    const values = tour[key] || [];
                    return active.some((v) => values.includes(v));
                };

                return (
                    check("countries", activeCountries) &&
                    check("destinations", activeDestinations) &&
                    check("themes", activeThemes) &&
                    check("religions", activeReligions) &&
                    check("activities", activeActivities)
                );
            },
        [
            days,
            activeCountries,
            activeDestinations,
            activeThemes,
            activeReligions,
            activeActivities,
        ]
    );

    const filteredTours = useMemo(
        () => tourDetails.filter((tour) => matches(tour)),
        [matches]
    );

    // How many tours you'd get by ticking this option, given the other filters.
    // Surfacing this (and disabling the zeroes) is what stops a click from
    // silently emptying the page.
    const facetCount = useMemo(
        () => (key: FacetKey, option: string) =>
            tourDetails.filter(
                (tour) => matches(tour, key) && (tour[key] || []).includes(option)
            ).length,
        [matches]
    );

    const hasActiveFilters =
        activeCountries.length > 0 ||
        activeDestinations.length > 0 ||
        activeThemes.length > 0 ||
        activeReligions.length > 0 ||
        activeActivities.length > 0 ||
        days[0] < maxDays;

    const clearAll = () => {
        setDays([maxDays]);
        setSelectedCountries({});
        setSelectedDestinations({});
        setSelectedThemes({});
        setSelectedActivities({});
        setSelectedReligions({});
    };

    // Derived state for display
    const displayTours = useMemo(
        () =>
            filteredTours.map((tour) => ({
                id: tour.id,
                destination: "Sri Lanka",
                title: tour.title,
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
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg transition-all">
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
                                        {days[0] < maxDays ? `≤ ${days[0]}` : "Any"}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-80 p-6" align="start">
                                <div className="space-y-4">
                                    <h4 className="font-medium leading-none">Trip Duration</h4>
                                    <p className="text-sm text-slate-500">
                                        How many days do you have?
                                    </p>
                                    <div className="pt-4">
                                        <Slider
                                            value={days}
                                            onValueChange={setDays}
                                            min={minDays}
                                            max={maxDays}
                                            step={1}
                                            className="cursor-pointer"
                                            aria-label="Trip Duration Days Slider"
                                        />
                                        <div className="mt-4 flex items-center justify-between text-sm">
                                            <span className="text-slate-500">Min: {minDays}</span>
                                            <span className="font-bold text-brand-600">
                                                Up to {days[0]} Days
                                            </span>
                                            <span className="text-slate-500">Max: {maxDays}</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 2. COUNTRY */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedCountries).some(Boolean)
                                        ? "bg-brand-50 border-brand-200 text-brand-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Country
                                    {Object.values(selectedCountries).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold">
                                            {Object.values(selectedCountries).filter(Boolean).length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-64 p-4" align="start">
                                <div className="space-y-3">
                                    <h4 className="font-medium">Country</h4>
                                    {countries.map((c) => (
                                        <FilterCheckboxRow
                                            key={c}
                                            label={c}
                                            count={facetCount("countries", c)}
                                            checked={selectedCountries[c] === true}
                                            onCheckedChange={(v) =>
                                                setSelectedCountries((prev) => ({ ...prev, [c]: v }))
                                            }
                                        />
                                    ))}
                                    <p className="pt-1 text-xs leading-relaxed text-slate-400">
                                        Regional add-ons are arranged on request — ask us for a
                                        multi-destination itinerary.
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 3. DESTINATIONS */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedDestinations).some(Boolean)
                                        ? "bg-brand-50 border-brand-200 text-brand-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Destinations
                                    {Object.values(selectedDestinations).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold">
                                            {Object.values(selectedDestinations).filter(Boolean).length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-64 p-4" align="start">
                                <div className="max-h-[19rem] space-y-3 overflow-y-auto">
                                    <h4 className="font-medium">Destinations</h4>
                                    {destinations.map((d) => (
                                        <FilterCheckboxRow
                                            key={d}
                                            label={d}
                                            count={facetCount("destinations", d)}
                                            checked={selectedDestinations[d] === true}
                                            onCheckedChange={(v) =>
                                                setSelectedDestinations((prev) => ({ ...prev, [d]: v }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 4. THEMES */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedThemes).some(Boolean)
                                        ? "bg-brand-50 border-brand-200 text-brand-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Themes
                                    {Object.values(selectedThemes).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold">
                                            {Object.values(selectedThemes).filter(Boolean).length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-64 p-4" align="start">
                                <div className="space-y-3">
                                    <h4 className="font-medium">Travel Theme</h4>
                                    {tourThemes.map((theme) => (
                                        <FilterCheckboxRow
                                            key={theme}
                                            label={theme}
                                            count={facetCount("themes", theme)}
                                            checked={selectedThemes[theme] === true}
                                            onCheckedChange={(c) =>
                                                setSelectedThemes((prev) => ({ ...prev, [theme]: c }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 5. RELIGIONS */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedReligions).some(Boolean)
                                        ? "bg-brand-50 border-brand-200 text-brand-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Religions
                                    {Object.values(selectedReligions).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold">
                                            {Object.values(selectedReligions).filter(Boolean).length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-64 p-4" align="start">
                                <div className="space-y-3">
                                    <h4 className="font-medium">Religions</h4>
                                    {religions.map((rel) => (
                                        <FilterCheckboxRow
                                            key={rel}
                                            label={rel}
                                            count={facetCount("religions", rel)}
                                            checked={selectedReligions[rel] === true}
                                            onCheckedChange={(c) =>
                                                setSelectedReligions((prev) => ({ ...prev, [rel]: c }))
                                            }
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* 6. ACTIVITIES */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`rounded-full border-slate-300 h-9 ${Object.values(selectedActivities).some(Boolean)
                                        ? "bg-brand-50 border-brand-200 text-brand-700"
                                        : "bg-white"
                                        }`}
                                >
                                    Activities
                                    {Object.values(selectedActivities).some(Boolean) && (
                                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold">
                                            {Object.values(selectedActivities).filter(Boolean).length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" avoidCollisions={false} className="w-64 p-4" align="start">
                                <div className="max-h-[19rem] space-y-3 overflow-y-auto">
                                    <h4 className="font-medium">Activities</h4>
                                    {activities.map((act) => (
                                        <FilterCheckboxRow
                                            key={act}
                                            label={act}
                                            count={facetCount("activities", act)}
                                            checked={selectedActivities[act] === true}
                                            onCheckedChange={(c) =>
                                                setSelectedActivities((prev) => ({ ...prev, [act]: c }))
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
                                className="text-slate-500 hover:text-red-600 disabled:opacity-40"
                                aria-label="Clear all applied filters"
                                disabled={!hasActiveFilters}
                                onClick={clearAll}
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
                            {filteredTours.length}{" "}
                            {filteredTours.length === 1 ? "Experience" : "Experiences"} Found
                        </p>
                    </div>
                </div>

                {displayTours.length === 0 ? (
                    // Without this the grid just rendered nothing below the filter bar,
                    // which reads as a broken page rather than "no matches".
                    <div className="mt-8 rounded-[2rem] border border-slate-100 bg-white p-16 text-center shadow-sm">
                        <MapPin className="mx-auto mb-6 h-12 w-12 text-slate-200" />
                        <h3 className="mb-3 text-xl font-bold text-slate-900">
                            No tours match these filters
                        </h3>
                        <p className="mx-auto mb-8 max-w-md text-slate-600">
                            Try removing a filter or widening the trip duration — or tell us
                            what you have in mind and we&apos;ll build it for you.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button onClick={clearAll} className="rounded-full">
                                Clear all filters
                            </Button>
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                Request a custom tour
                            </Link>
                        </div>
                    </div>
                ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {displayTours.map((tour, index) => {
                        const fullDetail = tour.detail;
                        if (!fullDetail) return null;
                        return (
                            <div key={tour.id} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-slate-100 h-full">
                                    {/* Full-card navigation link — stretched, sits under the interactive controls */}
                                    <Link
                                        href={`/tours/${tour.id}`}
                                        aria-label={`View details for ${tour.title}`}
                                        className="absolute inset-0 z-10"
                                    />
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
                                                    className="bg-brand-500/90 text-white backdrop-blur-md border-none px-3 py-1 text-xs font-bold uppercase tracking-wider"
                                                >
                                                    {theme}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Book Now Button — layered above the stretched card link */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <Link
                                                href={`/tours/${tour.id}/checkout`}
                                                className="flex items-center gap-1.5 bg-green-600/90 hover:bg-green-700 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                                            >
                                                <span>Book Now</span>
                                            </Link>
                                        </div>

                                        {fullDetail.images && fullDetail.images.length > 0 ? (
                                            <Image
                                                src={fullDetail.images[0]}
                                                alt={fullDetail.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                priority={index < 4}
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
                                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
                                                <MapPin className="h-3.5 w-3.5" />
                                                <span>{tour.destination}</span>
                                            </div>
                                            <h3 className="line-clamp-2 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">
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
                                                className="rounded-full px-5 bg-slate-900 group-hover:bg-brand-600 transition-colors"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                        );
                    })}
                </div>
                )}
            </section>

            <TourFaqSection />
        </>
    );
}
