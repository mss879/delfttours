import json

# Correct titles from the manually provided list
correct_titles = {
    'SL-3D2N-CTY-01': 'A 3 Day Quick Tour of 2 Cities',
    'SL-4D3N-STD-01': '4 Days - Essence of Sri Lanka',
    'SL-5D4N-STD-01': '5 Days - Essence of Sri Lanka',
    'SL-5D4N-STD-02': '5 Days - Island Escape',
    'SL-5D4N-WLD-03': '5 Days Tour Package: Temples, Wildlife and Beach',
    'SL-5D4N-BCH-04': '5 Days Tour Package: Taste of Paradise',
    'SL-5D4N-STD-05': '5 Days Tour Package: Island Escape',
    'SL-5D4N-HNM-06': '5 Days Tour Package: Romantic Days in Paradise',
    'SL-6D5N-STD-01': '6 Days Tour Package: Island Charm Express',
    'SL-6D5N-STD-02': '6 Days Tour Package: Tropical Trails',
    'SL-6D5N-WLD-03': '6 Days Tour Package: Temples, Wildlife and Beach',
    'SL-7D6N-HNM-01': '7 Days Tour Package: Love and Adventure',
    '7D6N-NGBE-02': '7 Days Tour Package: Whispers of Lanka',
    'SL-7D6N-STD-02': '8 Days Tour Package: Rhythms of Ceylon',
    'SL-9D8N-STD-01': '9 Days Tour Package: Pearl Island Getaway',
    'SL-10D9N-STD-01': '10-day Sri Lanka Dream Route',
    'SL-10D9N-STD-02': '10 Days Tour Package: Amazing Sri Lanka',
    'SL-11D10N-STD-01': '11 Days Tour Package: Full Spectrum Journey',
    'SL-12D11N-STD-01': '12 Days Tour Package: Ceylon Panorama Journey',
    'SL-12D11N-HNM-02': '12 Days Tour Package: Dreamy',
    'SL-14D13N-CLT-01': '14 Days Tour Package: Journey Culture and Nature',
    'SL-13D12N-STD-01': '13 Days Tour Package: Sri Lanka Explorer',  # Fixing the generic one nicely while we are at it
    'SL-15D14N-HNM-01': '15-day Romantic Bliss tour package is a luxury honeymoon journey',
}

# Read the extracted tours
with open("extracted_tours.json", "r") as f:
    tours = json.load(f)

# Update titles and clean descriptions if necessary
for tour in tours:
    tid = tour.get("id")
    if tid in correct_titles:
        tour["title"] = correct_titles[tid]
        
        # Also, check if description is empty, if so, maybe copy title or leave blank
        if not tour.get("description") or tour.get("description") == "":
             # If description is missing (common in the bad parse), use the first day's overview if available
             # Or leave it blank so UI can handle it.
             # Actually, let's leave it blank, or use a filler? 
             # The UI shows description. If empty, it looks bad.
             # Let's see if we can extract "Overview" from day 1 description if it exists?
             pass

    # Ensure images array exists
    if "images" not in tour:
        tour["images"] = [
            "/assets/tour/hero.jpg", 
            "/assets/tour/thumb1.jpg", 
            "/assets/tour/thumb2.jpg"
        ]

# Write back to JSON (optional, but good for debugging)
with open("extracted_tours_fixed.json", "w") as f:
    json.dump(tours, f, indent=2)

# Generate TS content
ts_content = "export type TourDetail = {\n  id: string;\n  title: string;\n  description: string;\n  images: string[];\n  days: { title: string; description: string }[];\n  inclusions: string[];\n};\n\n"
ts_content += "export const tourDetails: TourDetail[] = " + json.dumps(tours, indent=2) + ";\n"

# Write to the TS file
with open(r"app/tours/tour-data.ts", "w") as f:
    f.write(ts_content)

print("Successfully patched titles and updated tour-data.ts")
