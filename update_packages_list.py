import re
import json

target_packages = [
    {"id": "SL-3D2N-CTY-01", "title": "A 3 Day Quick Tour of 2 Cities - Glimpse of Lanka the Paradise Isle"},
    {"id": "SL-4D3N-STD-01", "title": "4 Days - Essence of Sri Lanka"},
    {"id": "SL-5D4N-STD-01", "title": "5 Days - Essence of Sri Lanka"},
    {"id": "SL-5D4N-STD-02", "title": "5 Days - Island Escape"},
    {"id": "SL-5D4N-WLD-03", "title": "5 Days Tour Package: Temples, Wildlife and Beach"},
    {"id": "SL-5D4N-BCH-04", "title": "5 Days Tour Package: Taste of Paradise"},
    {"id": "SL-5D4N-STD-05", "title": "5 Days Tour Package: Island Escape"},
    {"id": "SL-5D4N-HNM-06", "title": "5 Days Tour Package: Romantic Days in Paradise"},
    {"id": "SL-6D5N-STD-01", "title": "6 Days Tour Package: Island Charm Express"},
    {"id": "SL-6D5N-STD-02", "title": "6 Days Tour Package: Tropical Trails"},
    {"id": "SL-6D5N-WLD-03", "title": "6 Days Tour Package: Temples, Wildlife and Beach"},
    {"id": "SL-7D6N-HNM-01", "title": "7 Days Tour Package: Love and Adventure"},
    {"id": "SL-7D6N-NGBE-02", "title": "7 Days Tour Package: Whispers of Lanka"},
    {"id": "SL-7D6N-STD-02", "title": "8 Days Tour Package: Rhythms of Ceylon"},
    {"id": "SL-9D8N-STD-01", "title": "9 Days Tour Package: Pearl Island Getaway"}
]

file_path = 'app/tours/tour-data.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Split file into header and data
# We assume the data starts with 'export const tourDetails: TourDetail[] = ['
header_end_idx = content.find('export const tourDetails: TourDetail[] = [')
if header_end_idx == -1:
    print("Could not find tourDetails array start")
    exit(1)

header = content[:header_end_idx]
# The array content starts after the opening bracket
array_content_start = header_end_idx + len('export const tourDetails: TourDetail[] = [')

# Parse existing objects
# We use regex to find all objects looking like { "id": "..." ... }
# We capture the full object text
# Pattern: looks for 'id": "ID"' and captures the surrounding braces
# This is tricky because of nested braces in 'days'.
# But since we are replacing the LIST, we can just extract based on top-level braces?
# No, easier: find all IDs, and for each ID find its start and end in the file.

# Better: Regular expression to capture { ... "id": "XXX" ... } is hard.
# Let's iterate the FILE content matching "id": "..."
# and assume objects are separated by commas at root level.
# Actually, the file is well formatted. Objects start with `  {` and end with `  },`?

# Let's use a simpler approach:
# 1. Identify where each ID starts.
# 2. Extract the block for that ID.
# 3. Store in map.

existing_tours = {}

# Find all occurrences of "id": "..."
# We assume the ID line is roughly valid JSON key-value
id_matches = list(re.finditer(r'"id":\s*"(.*?)"', content))

for i, match in enumerate(id_matches):
    tour_id = match.group(1)
    # Find start of object: scan backwards from match.start() for '{'
    # BUT we must be careful not to match '{' inside another object if we scan too far?
    # The 'id' is distinct. The nearest preceding '{' at the same indentation level?
    # Let's verify indentation. `  {` (2 spaces) seems standard for top level objects.
    
    start_search = match.start()
    obj_start = content.rfind('{', 0, start_search)
    
    # Find end of object:
    # We need to balance braces.
    # Start at obj_start, count braces until 0.
    
    brace_count = 0
    obj_end = -1
    for j in range(obj_start, len(content)):
        if content[j] == '{':
            brace_count += 1
        elif content[j] == '}':
            brace_count -= 1
            if brace_count == 0:
                obj_end = j + 1
                break
    
    if obj_end != -1:
        full_obj_text = content[obj_start:obj_end]
        existing_tours[tour_id] = full_obj_text

# Now construct the new list
new_tour_details = []

for pkg in target_packages:
    tid = pkg['id']
    title = pkg['title']
    
    if tid in existing_tours:
        # Update title in existing text
        # Regex replace "title": "..." with "title": "NEW_TITLE"
        # We only replace the FIRST occurrence which is the main title
        t_text = existing_tours[tid]
        
        # Careful not to replace 'title' inside 'days' array first...
        # The main title comes before 'days'.
        # "title": "..."
        
        # We use strict replacement for the first "title": "..." found
        t_text = re.sub(r'"title":\s*".*?"', f'"title": "{title}"', t_text, count=1)
        new_tour_details.append(t_text)
    else:
        # Create new placeholder
        print(f"Creating new entry for {tid}")
        
        # Placeholder image logic (reuse downloading logic or use generic)
        # We'll use a generic placeholder path
        img_path = f"/package-previews/{tid}.jpg"
        
        new_obj = f"""  {{
    "id": "{tid}",
    "title": "{title}",
    "description": "Detailed itinerary coming soon.",
    "days": [
      {{
        "title": "Day 1",
        "description": "Arrival and welcome."
      }},
      {{
        "title": "Day 2",
        "description": "Exploration and activities."
      }},
      {{
        "title": "Day 3 - Departure",
        "description": "Departure transfer."
      }}
    ],
    "inclusions": [
      "Private Driver/Guide",
      "Private Luxury Car",
      "Breakfast Included",
      "Airport Drop-off",
      "Airport Pick-up",
      "Tour Consultant"
    ],
    "images": [
      "{img_path}",
      "https://images.pexels.com/photos/35251716/pexels-photo-35251716.jpeg",
      "https://images.pexels.com/photos/4403937/pexels-photo-4403937.jpeg"
    ]
  }}"""
        new_tour_details.append(new_obj)

# Reconstruct file
# Header + "export const tourDetails: TourDetail[] = [\n" + joined_objs + "\n];"
final_content = header + "export const tourDetails: TourDetail[] = [\n" + ",\n".join(new_tour_details) + "\n];\n"

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Successfully updated tour-data.ts")
