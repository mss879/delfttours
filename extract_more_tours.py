import pypdf
import re
import json
import os

def clean_text(text):
    # Based on observation: 2 spaces = word break, 1 space = in-word spacing
    return text.replace("  ", "|||").replace(" ", "").replace("|||", " ")

pdf_path = r"c:\Users\Shahid\Downloads\38-68.pdf"
reader = pypdf.PdfReader(pdf_path)

full_text = ""
for page in reader.pages:
    extracted = page.extract_text()
    if extracted:
        full_text += clean_text(extracted) + "\n"

# Split by "Pricing" which seems to start every tour
# Note: "Pricing" might be "Pricing" or "P r i c i n g" but handle by clean_text
# In clean_text: "Pricing". 
# Pattern: `PricingSTANDARD`
chunks = re.split(r"Pricing\s*STANDARD", full_text)

tours = []

for chunk in chunks:
    if not chunk.strip():
        continue
        
    # extract ID
    id_match = re.search(r"(SL-[\w-]+)", chunk)
    if not id_match:
        continue
    
    tour_id = id_match.group(1)
    
    # Extract Title
    # Heuristics:
    # Look for "Tour Package:"
    # ex: `6 Days Tour Package: Temples, Wildlife and Beach` found near the ID at the bottom of page 1 of tour
    # OR at the top: `Sri Lanka 3 Nights 4 Days - Essence of Sri Lanka`
    
    title = ""
    # Try looking for "Days Tour Package:"
    title_match = re.search(r"(\d+\s*Days.*?Tour\s*Package[:\-].*?)(?=\n|SL-)", chunk, re.IGNORECASE)
    if title_match:
        title = title_match.group(1).replace('\n', ' ').strip()
    else:
        # Fallback: Look for "Essence of Sri Lanka" or similar at the top
        # chunk starts with "..." (Pricing table removed)
        # Scan first few lines
        lines = [l for l in chunk.split('\n') if l.strip()]
        for i, line in enumerate(lines[:20]):
            if "Sri Lanka" in line and "Days" in line and "-" in line:
                # "Sri Lanka 3 Nights 4 Days - Essence of Sri Lanka"
                parts = line.split("-")
                if len(parts) > 1:
                    title = parts[1].strip()
                    break
    
    if not title:
        title = f"Tour {tour_id}"

    # Extract Description
    description = ""
    # "Our ... tour package is a ..."
    desc_match = re.search(r"(Our\s*\d+[- ]?day.*?)(?=\n\d+\s*Days|\nDay\s*1)", chunk, re.DOTALL | re.IGNORECASE)
    if desc_match:
        description = desc_match.group(1).replace('\n', ' ').strip()
    
    # Extract Inclusions
    inclusions = []
    if "Inclusion" in chunk:
        inc_part = chunk.split("Inclusion")[1].split("Exclusion")[0]
        # Lines in inc_part
        inc_lines = [l.strip() for l in inc_part.split('\n') if l.strip()]
        # Filter typical inclusion lines
        for l in inc_lines:
            if len(l) < 50 and not l.startswith("Exclusion"):
               inclusions.append(l)

    # Extract Days
    days = []
    # Find all "Day X" blocks
    # Pattern: Day X: ... or Day X ...
    # We can split by `Day \d+`
    
    # Robust Split:
    # Use re.split keeping the delimiter
    day_splits = re.split(r"(Day\s*\d+[:\s].*?)", chunk)
    
    # Logic: day_splits[0] is preamble.
    # day_splits[1] is "Day 1 ...", day_splits[2] is content of Day 1
    # day_splits[3] is "Day 2 ...", day_splits[4] is content of Day 2
    
    current_day = {}
    
    for i in range(1, len(day_splits), 2):
        header = day_splits[i]  # "Day 1: Kandy | ..."
        content = day_splits[i+1] # "... content ..."
        
        # Clean header
        header = header.strip()
        # Clean content (stop at next day or end)
        # Actually split effectively stops at next day
        
        day_desc = content.strip()
        
        # Sometimes header contains title "Day 1: Kandy | Title"
        # Combine if needed
        full_day = header + " " + day_desc
        
        # Title is usually the header part
        day_title = header.replace('\n', ' ')
        
        days.append({
            "title": day_title,
            "description": day_desc
        })

    tours.append({
        "id": tour_id,
        "title": title,
        "description": description,
        "days": days,
        "inclusions": inclusions,
        "images": ["/assets/tour/hero.jpg", "/assets/tour/thumb1.jpg", "/assets/tour/thumb2.jpg"]
    })

# Load existing tours
existing_tours = []
if os.path.exists("app/tours/tour-data.ts"):
    with open("app/tours/tour-data.ts", "r") as f:
        content = f.read()
        # Extract the JSON list
        # It follows "export const tourDetails: TourDetail[] = "
        match = re.search(r"export const tourDetails: TourDetail\[\] = (\[.*\]);", content, re.DOTALL)
        if match:
            try:
                existing_tours = json.loads(match.group(1))
            except Exception as e:
                print(f"Error parsing existing JS data: {e}")
                # Fallback to json files if TS parse fails
                if os.path.exists("extracted_tours_fixed.json"):
                    pass # logic below covers this
        
    if not existing_tours and os.path.exists("extracted_tours_fixed.json"):
         with open("extracted_tours_fixed.json", "r") as f:
            existing_tours = json.load(f)

# Append new tours (check duplicates)
existing_ids = {t['id'] for t in existing_tours}
for t in tours:
    if t['id'] not in existing_ids:
        existing_tours.append(t)

# Write back
ts_content = "export type TourDetail = {\n  id: string;\n  title: string;\n  description: string;\n  images: string[];\n  days: { title: string; description: string }[];\n  inclusions: string[];\n};\n\n"
ts_content += "export const tourDetails: TourDetail[] = " + json.dumps(existing_tours, indent=2) + ";\n"

with open(r"app/tours/tour-data.ts", "w") as f:
    f.write(ts_content)

print(f"Added {len(tours)} new tours. Total {len(existing_tours)}.")
