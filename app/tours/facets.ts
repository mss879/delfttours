import type { TourDetail } from "@/app/tours/tour-data";

// Shared tour-filter vocabulary + option derivation. Extracted from
// TourListing so the public listing and the admin editor (which suggests
// existing tag values) read from ONE source of truth. Pure data/functions —
// safe to import from both client and server components.

export type FacetKey = "countries" | "destinations" | "themes" | "religions" | "activities";

// Preferred display order. Anything present in the data but not listed here still
// gets shown (appended, alphabetical) — the data is the source of truth, this only
// controls ordering.
export const FACET_ORDER: Record<FacetKey, string[]> = {
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
// these regional add-ons, so they stay visible (greyed out at 0 by the row) as a
// signal of the offering rather than vanishing.
export const ALWAYS_SHOW: FacetKey[] = ["countries"];

// Every other facet's options are derived from the tour data rather than
// hardcoded, so the UI can never advertise a facet no tour carries. Pass the
// live tour set (DB-backed or fallback) and options follow the data.
export function buildOptions(key: FacetKey, tours: TourDetail[]): string[] {
    if (ALWAYS_SHOW.includes(key)) return FACET_ORDER[key];
    const present = new Set<string>();
    tours.forEach((tour) => (tour[key] || []).forEach((v) => present.add(v)));
    const ordered = FACET_ORDER[key].filter((o) => present.has(o));
    const extras = Array.from(present)
        .filter((p) => !FACET_ORDER[key].includes(p))
        .sort();
    return [...ordered, ...extras];
}

export const FACET_KEYS: FacetKey[] = ["countries", "destinations", "themes", "religions", "activities"];

// Suggested tag values for the admin editor: the curated FACET_ORDER union with
// every value already present across the given package rows. Accepts raw DB rows
// (whose tag columns share the FacetKey names).
export function knownTagValues(rows: Array<Record<string, unknown>>): Record<FacetKey, string[]> {
    const out = {} as Record<FacetKey, string[]>;
    for (const key of FACET_KEYS) {
        const present = new Set<string>(FACET_ORDER[key]);
        rows.forEach((row) => {
            const arr = row[key];
            if (Array.isArray(arr)) arr.forEach((v) => typeof v === "string" && present.add(v));
        });
        out[key] = Array.from(present);
    }
    return out;
}
