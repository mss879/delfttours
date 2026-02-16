import re
import os
import json

# Configuration
RAW_FILES = ["tours_raw.txt", "tours_raw_part2.txt", "tours_raw_part3.txt"]
EXISTING_DATA_FILE = "app/tours/tour-data.ts"
MAPS_DIR = "public/package maps"
OUTPUT_FILE = "app/tours/tour-data.ts" # We will overwrite this

def extract_existing_data(filepath):
    """
    Extracts ID, Title, Images, and MapImage from the existing TypeScript file.
    Uses a line-based state machine to correctly handle nested fields.
    """
    if not os.path.exists(filepath):
        return {}
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    data = {}
    current_id = None
    current_obj = {}
    in_images = False
    
    lines = content.split('\n')
    
    for line in lines:
        stripped = line.strip()
        
        # Check for ID (Start of a new tour object)
        id_match = re.search(r'["\']?id["\']?:\s*["\'](SL-[^"\']+)["\']', stripped)
        if id_match:
            # Save previous if exists
            if current_id:
                data[current_id] = current_obj
            
            current_id = id_match.group(1)
            current_obj = {"images": []}
            in_images = False # Reset state
            continue
            
        if not current_id:
            continue
            
        # Check for Title (ONLY if not set yet, to avoid capturing day titles)
        if "title" not in current_obj:
            # Ensure it's the "title" key of the tour, not nested. 
            # In standard formatting, the tour title is usually strictly indented or just extracted once.
            # We assume the First "title": value seen after "id" is the Tour Title.
            title_match = re.search(r'["\']?title["\']?:\s*["\']([^"\']+)["\']', stripped)
            if title_match:
                current_obj["title"] = title_match.group(1)
        
        # Check for MapImage
        if "mapImage" not in current_obj:
            map_match = re.search(r'["\']?mapImage["\']?:\s*["\']([^"\']+)["\']', stripped)
            if map_match:
                current_obj["mapImage"] = map_match.group(1)
        
        # Check for Images array start
        if '"images":' in stripped or "'images':" in stripped or (stripped.startswith("images:") and "[" in stripped):
            in_images = True
            # Check if there are inline images on the same line (rare but possible)
            # e.g. images: ["url1", "url2"],
            if "]" in stripped:
                # inline array
                 urls = re.findall(r'["\']([^"\']+)["\']', stripped.split(":", 1)[1])
                 current_obj["images"].extend(urls)
                 in_images = False
            continue
            
        if in_images:
            if "]" in stripped:
                in_images = False
            else:
                # Extract URL string
                url_match = re.search(r'["\']([^"\']+)["\']', stripped)
                if url_match:
                    current_obj["images"].append(url_match.group(1))
    
    # Save the last one
    if current_id:
        data[current_id] = current_obj
        
    return data

def parse_raw_files(file_list):
    tours = []
    current_tour = None
    current_day = None
    
    # Helper to check if a line is a new tour ID
    def is_new_tour(l):
        return re.match(r'^SL-\d+D\d+N-[A-Z]+-\d+:$', l) or re.match(r'^SL-\d+D\d+N-[A-Z]+-\d+$', l)

    for fname in file_list:
        if not os.path.exists(fname):
            print(f"File not found: {fname}")
            continue
            
        with open(fname, "r", encoding="utf-8") as f:
            lines = f.readlines()
            
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Check for new tour ID
            id_match = re.match(r'^(SL-\d+D\d+N-[A-Z]+-\d+):?$', line)
            if id_match:
                if current_tour:
                    if current_day:
                        current_tour["days"].append(current_day)
                        current_day = None
                    tours.append(current_tour)
                
                current_tour = {
                    "id": id_match.group(1),
                    "days": [],
                    "inclusions": [
                        "Private Driver/Guide",
                        "Private Luxury Car",
                        "Breakfast Included",
                        "Airport Drop-off",
                        "Airport Pick-up",
                        "Tour Consultant"
                    ],
                    "raw_details": []
                }
                current_day = None
                continue
            
            if current_tour is None:
                continue
                
            # Parse attributes
            if line.startswith("•\tDuration:"):
                current_tour["raw_duration"] = line.split(":", 1)[1].strip()
            elif line.startswith("•\tTour Type:"):
                current_tour["tour_type"] = line.split(":", 1)[1].strip()
            elif line.startswith("•\tSuitable For:"):
                current_tour["suitable_for"] = line.split(":", 1)[1].strip()
            elif line.startswith("•\tMeal Plan:"):
                current_tour["meal_plan"] = line.split(":", 1)[1].strip()
            
            # Parse Itinerary Days
            # Handles "Day 1: ...", "Day 1 – ...", "Day 1 ...", "Day 01 ..."
            day_match = re.match(r'^(Day\s+\d+)\s*[:–-]\s*(.*)', line, re.IGNORECASE)
            if not day_match:
                 # Try matching just "Day 1" if it's on a line alone?
                 day_match = re.match(r'^(Day\s+\d+)$', line, re.IGNORECASE)

            if day_match:
                if current_day:
                    current_tour["days"].append(current_day)
                
                title_suffix = day_match.group(2).strip() if len(day_match.groups()) > 1 else ""
                day_title = f"{day_match.group(1)}: {title_suffix}" if title_suffix else day_match.group(1)
                # Clean up title
                day_title = day_title.replace("|", "-").strip()
                if day_title.endswith("-"): day_title = day_title[:-1].strip()

                current_day = {
                    "title": day_title,
                    "description": ""
                }
            elif current_day:
                # Append to current day description
                # Clean up bullet points
                clean_line = line.lstrip("•").lstrip("-").strip()
                if clean_line:
                    current_day["description"] += f"• {clean_line}\n"
            else:
                # Description lines before first day?
                pass
                
        # End of file loop
        if current_tour:
            if current_day:
                current_tour["days"].append(current_day)
            tours.append(current_tour)
            # Reset for next file
            current_tour = None
            current_day = None
            
    return tours



def map_images_to_tours(tours, existing_data):
    # Get available map files
    map_files = []
    if os.path.exists(MAPS_DIR):
        map_files = os.listdir(MAPS_DIR)
        
    explicit_map = {
        "SL-3D2N-CTY-01": "3 Day Quick Tour of 2 Cities Glimpse of Lanka the Paradise Isle.png",
        "SL-4D3N-STD-01": "Sri Lanka 3 Nights 4 Days essenve of sri lanka.png",
        "SL-5D4N-STD-01": "5 day taste of paradise.png",
        "SL-5D4N-HNM-06": "5 day ramantic days in aradise.png",
        "SL-6D5N-STD-01": "6 day tropical days.png",
        "SL-7D6N-NGBE-02": "7 day whisper of lanka.png",
        "SL-7D6N-HNM-01": "7 day love and adventure.png",
        "SL-7D6N-STD-02": "8 days rhythm of ceylon.png",
        "SL-10D9N-STD-01": "10 days sri lanka dream route.png",
        "SL-12D11N-STD-01": "12 days ceylon panorama journey.png",
        "SL-12D11N-HNM-02": "12 days dreamy honeymoon days.png",
    }

    explicit_titles = {
        "SL-3D2N-CTY-01": "3 Day Quick Tour of 2 Cities",
        "SL-4D3N-STD-01": "4 Days Essence of Sri Lanka",
        "SL-5D4N-STD-01": "5 Days Essence of Sri Lanka",
        "SL-5D4N-STD-02": "5 Days Island Escape",
        "SL-5D4N-WLD-03": "5 Days Temples Wildlife Beach",
        "SL-5D4N-BCH-04": "5 Days Taste of Paradise",
        "SL-5D4N-STD-05": "5 Days Island Escape (High Tea Variation)",
        "SL-5D4N-HNM-06": "5 Days Romantic Paradise",
        "SL-6D5N-STD-01": "6 Days Island Charm",
        "SL-6D5N-STD-02": "6 Days Tropical Trails",
        "SL-11D10N-STD-01": "11 Days Full Spectrum",
        "SL-12D11N-STD-01": "12 Days Ceylon Panorama",
        "SL-12D11N-HNM-02": "12 Days Dreamy Honeymoon",
        "SL-14D13N-CLT-01": "14 Days Culture Nature",
        "SL-13D12N-STD-01": "13 Days Grand Discovery"
    }
    
    # Fuzzy / Heuristic Mapping (ID -> Map)
    for tour in tours:
        tid = tour["id"]
        
        # 1. Use explicit map
        if tid in explicit_map:
            tour["mapImage"] = explicit_map[tid]
        
        # 2. Try to find a map file that contains the ID or part of it? No.
        # Try to find a map file that matches duration?
        # e.g. "5 days templ e,winldlife and beach.png" matches 5D4N?
        elif not tour.get("mapImage"):
            duration_days = re.search(r'(\d+)D', tid)
            days = duration_days.group(1) if duration_days else "99"
            
            # Look for map starting with "X day" or "X days"
            candidates = [f for f in map_files if f.lower().startswith(f"{days} day")]
            if len(candidates) == 1:
                tour["mapImage"] = candidates[0]
            # If multiple candidates, we can't be sure, skip or use first?
            # Better to be safe and skip if ambiguous.
            
    # Title Generation
    for tour in tours:
        tid = tour["id"]
        
        # 1. Use Explicit Title (Recovered from preview generator)
        if tid in explicit_titles:
            tour["title"] = explicit_titles[tid]
        
        # 2. Use existing title ONLY if it valid (and we didn't have explicit one)
        elif not tour.get("title") and tid in existing_data:
            t = existing_data[tid].get("title", "")
            if t and not t.strip().lower().startswith("day ") and len(t) > 10:
                tour["title"] = t
        
        # 3. Derive from Map Image Filename (if still no title)
        if not tour.get("title") and tour.get("mapImage"):
                # "3 Day Quick Tour... .png" -> "3 Day Quick Tour..."
                t = os.path.splitext(tour["mapImage"])[0]
                # Clean up known typos
                t = t.replace("essenve", "Essence").replace("ramantic", "Romantic").replace("aradise", "Paradise")
                t = t.replace("templ e", "Temple").replace("winldlife", "Wildlife")
                # Title Case
                tour["title"] = t.title()
                
        # 4. Generic Title (Fallback)
        if not tour.get("title"):
             duration = tour.get("raw_duration", "")
             tour["title"] = f"Sri Lanka Tour - {duration}"

        # Description
        desc_parts = []
        if "raw_duration" in tour: desc_parts.append(f"Duration: {tour['raw_duration']}")
        if "tour_type" in tour: desc_parts.append(f"Type: {tour['tour_type']}")
        if "suitable_for" in tour: desc_parts.append(f"Suitable For: {tour['suitable_for']}")
        tour["description"] = "\n".join(desc_parts)

        # Images (Default)
        tour["images"] = [f"/package-previews/{tid}.jpg"]



def generate_ts(tours):
    ts_content = """export type TourDetail = {
  id: string;
  title: string;
  description: string;
  images: string[];
  days: { title: string; description: string }[];
  inclusions: string[];
  mapImage?: string;
};

export const tourDetails: TourDetail[] = [
"""
    for tour in tours:
        ts_content += "{\n"
        ts_content += f'    "id": "{tour["id"]}",\n'
        ts_content += f'    "title": {json.dumps(tour["title"])},\n'
        ts_content += f'    "description": {json.dumps(tour["description"])},\n'
        
        # Days
        ts_content += '    "days": [\n'
        for day in tour["days"]:
            ts_content += '      {\n'
            ts_content += f'        "title": {json.dumps(day["title"])},\n'
            ts_content += f'        "description": {json.dumps(day["description"].strip())}\n'
            ts_content += '      },\n'
        ts_content += '    ],\n'
        
        # Inclusions
        ts_content += '    "inclusions": [\n'
        for inc in tour["inclusions"]:
             ts_content += f'      "{inc}",\n'
        ts_content += '    ],\n'
        
        # Map Image
        if "mapImage" in tour:
            ts_content += f'    "mapImage": "{tour["mapImage"]}",\n'
            
        # Images
        ts_content += '    "images": [\n'
        for img in tour["images"]:
            ts_content += f'      "{img}",\n'
        ts_content += '    ]\n'
        
        ts_content += "  },\n"
        
    ts_content += "];\n"
    return ts_content

# Main Execution
existing = extract_existing_data(EXISTING_DATA_FILE)
new_tours = parse_raw_files(RAW_FILES)
map_images_to_tours(new_tours, existing)
ts_output = generate_ts(new_tours)

# Write output
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(ts_output)

print(f"Successfully processed {len(new_tours)} tours.")
