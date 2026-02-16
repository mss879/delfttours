import re
import json

# Read the file
with open('app/tours/tour-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON-like object part (simplified extraction)
# We assume the array starts after "export const tourDetails: TourDetail[] = [" and ends before the last "];"
start_marker = "export const tourDetails: TourDetail[] = ["
end_marker = "];"

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Could not find start marker")
    exit(1)

# Find the end of the array. It should be the last ]; in the file usually.
# But let's look for valid JS array ending.
# To be safer, we can try to parse the array content. 
# Since it is a TS file, it might not be valid JSON (keys not quoted, trailing commas).
# Python's json parser won't work directly if keys are unquoted or comments exist.
# However, in the provided view, keys ARE quoted ("id": "SL..."). 
# Trailing commas are the main issue for standard JSON parsers.

# Let's use a regex-based approach or just string manipulation if the structure is consistent.
# The `tour-data.ts` seems to have well-formatted JSON-like entries.

def get_themes(text):
    text = text.lower()
    themes = []
    if re.search(r'temple|kandy|sigiriya|dambulla|anuradhapura|polonnaruwa|culture|heritage|ancient|history|buddhist|kataragama|mihintale|galle fort|dutch fort', text):
        themes.append('Culture & Heritage')
    if re.search(r'safari|wild|elephant|yala|udawalawe|nature|park|leopard|bird|wilpattu|minneriya|kaudulla|national park|turtle', text):
        themes.append('Wildlife & Nature')
    if re.search(r'beach|sea|ocean|coast|bentota|mirissa|galle|hikkaduwa|swim|surf|trincomalee|negombo|pasikuda|nilaveli|tangalle|arugam bay|kalutara|induruwa', text):
        themes.append('Beach & Relax')
    if re.search(r'tea|nuwara eliya|ella|mountain|hill|scenic train|waterfall|haputale|horton plains|knuckles|ramboda|hatton', text):
        themes.append('Hill Country')
    if re.search(r'honeymoon|romantic|couple', text):
        themes.append('Honeymoon')
    if re.search(r'adventure|hike|trek|rafting|zip line|adam\'s peak|ella rock', text):
        themes.append('Adventure')
    return list(set(themes))

def get_activities(text):
    text = text.lower()
    acts = []
    if re.search(r'safari|yala|udawalawe|minneriya|wilpattu|kaudulla', text):
        acts.append('Safari')
    if re.search(r'whale|dolphin|mirissa|trincomalee', text):
        acts.append('Whale Watching')
    if re.search(r'tea factory|tea plantation|tea plucking', text):
        acts.append('Tea Factory Visit')
    if re.search(r'train|ella|scenic ride|nanu oya', text):
        acts.append('Train Ride')
    if re.search(r'city tour|colombo|kandy city|galle fort|galle city', text):
        acts.append('City Tour')
    if re.search(r'hike|trek|adam\'s peak|ella rock|little adam\'s|horton plains|knuckles|pidurangala', text):
        acts.append('Hiking/Trekking')
    if re.search(r'snorkel|dive|pigeon island|hikkaduwa|trincomalee', text):
        acts.append('Snorkeling/Diving')
    if re.search(r'cultural show|dance|kandy lake', text):
        acts.append('Cultural Show')
    if re.search(r'boat|madu river|gregory lake|hamilton canal|river safari', text):
        acts.append('Boat Ride')
    if re.search(r'cooking|spice garden', text):
        acts.append('Cooking Class')
    return list(set(acts))

# Process logic:
# 1. Read lines.
# 2. Identify start of a tour object ( `{` )
# 3. Accumulate lines of that object.
# 4. Identify end of tour object ( `},` )
# 5. Parse the object fields.
# 6. Generate tags.
# 7. Reconstruct the object string with new fields.

new_lines = []
in_tour_array = False
buffer = []
brace_count = 0

lines = content.splitlines()
start_processing = False

final_encoded_tours = []

# Regex to capture values
id_re = re.compile(r'"id":\s*"(.*?)"')
title_re = re.compile(r'"title":\s*"(.*?)"')
desc_re = re.compile(r'"description":\s*"(.*?)"')
# Simplified parsing: We will rely on text accumulation for regex searching
# We are NOT fully parsing JSON, just text matching for classification

processed_content = ""
current_tour_block = ""
capture_mode = False

output_lines = []

for line in lines:
    if "export const tourDetails: TourDetail[] = [" in line:
        output_lines.append(line)
        capture_mode = True
        continue
    
    if capture_mode:
        if line.strip() == "];":
            # End of array
            # Process the last buffered tour if any
            if current_tour_block.strip():
                # Process `current_tour_block`
                # Identifying the end of a block is tricky with line-by-line simple parsing if we look for `},`.
                # Let's change strategy.
                pass
            capture_mode = False
            output_lines.append(line)
            continue
            
        current_tour_block += line + "\n"
        
        # Check if this line ends a tour object. 
        # Usually `  },`
        if line.strip() == "},":
            # We have a full tour block in `current_tour_block`
            
            # Extract info for tagging
            # We treat the whole block as text for regex search
            full_text = current_tour_block
            
            themes = get_themes(full_text)
            activities = get_activities(full_text)
            
            # Insert the new fields before the closing brace
            # Find the last occurrence of "},"
            # Actually, `current_tour_block` ends with `},\n`
            
            # We want to insert before `  },`
            # Look for the last non-empty line before the closing brace line
            block_lines = current_tour_block.splitlines()
            
            # last line is "  },"
            # we want to insert before it
            
            # Format JSON arrays
            themes_str = '    "themes": ' + json.dumps(themes) + ','
            activities_str = '    "activities": ' + json.dumps(activities) + ','
            
            # Check if fields already exist (to avoid double adding if ran multiple times)
            if '"themes":' not in current_tour_block:
                block_lines.insert(-1, themes_str)
            if '"activities":' not in current_tour_block:
                block_lines.insert(-1, activities_str)
                
            new_block = "\n".join(block_lines) + "\n"
            output_lines.append(new_block)
            current_tour_block = ""
        
    else:
        output_lines.append(line)

# Write back
with open('app/tours/tour-data.ts', 'w', encoding='utf-8') as f:
    f.write("\n".join(output_lines))

print("Successfully added themes and activities to tour-data.ts")
