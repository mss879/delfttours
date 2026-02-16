import re
import json

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

# Read the file
with open('app/tours/tour-data.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
brace_level = 0
current_tour_buffer = []
in_tour_array = False

for line in lines:
    stripped = line.strip()
    
    # Remove existing explicit tags if they are malformed or being regenerated
    if stripped.startswith('"themes":') or stripped.startswith('"activities":'):
        continue
    
    if "export const tourDetails: TourDetail[] = [" in line:
        in_tour_array = True
        new_lines.append(line)
        brace_level = 1 # We are inside the array [
        continue
        
    if not in_tour_array:
        new_lines.append(line)
        continue
        
    # Track braces
    # Note: this is a simple counter. Strings with braces might confuse it, but unlikely in this file structure.
    brace_level += line.count('{')
    brace_level -= line.count('}')
    
    current_tour_buffer.append(line)
    
    # End of a tour object
    # If we are at brace_level 1 (inside array), and we just closed a brace
    # The tour start was at level 1 (going to 2). Tour end is 2 (going to 1).
    # Wait, array is level 1 ([). Tour object starts { -> level 2. Tour ends } -> level 1.
    
    # Let's verify levels:
    # export ... [  <- level 1
    #   {           <- level 2
    #     "days": [ <- level 3
    #       {       <- level 4
    #       },      <- level 3
    #     ]         <- level 2
    #   },          <- level 1
    # ]             <- level 0
    
    # So if we hit `},` and brace_level drops to 1, we finished a tour.
    
    # We need to detect the transition.
    # Before this line processing, brace_level was X. After, it is Y.
    # If Y is 1 and we just processed `},` or similar.
    
    # Actually, easier: check if line ends with `},` and brace_level is 1.
    if stripped == "}," and brace_level == 1:
        # We have a full tour in `current_tour_buffer`
        # Generate tags based on the full text of the buffer
        full_text = "".join(current_tour_buffer)
        
        themes = get_themes(full_text)
        activities = get_activities(full_text)
        
        # Insert strings before the last line (which is `},`)
        # The last line in buffer is `  },\n` (with indentation)
        
        last_line = current_tour_buffer.pop() # Remove `},`
        
        # Add tags
        themes_line = f'    "themes": {json.dumps(themes)},\n'
        activities_line = f'    "activities": {json.dumps(activities)},\n'
        
        current_tour_buffer.append(themes_line)
        current_tour_buffer.append(activities_line)
        current_tour_buffer.append(last_line) # Add back `},`
        
        new_lines.extend(current_tour_buffer)
        current_tour_buffer = []
        
    elif stripped == "];" and brace_level == 0:
        # End of array
        in_tour_array = False
        new_lines.extend(current_tour_buffer) # Should be empty or trailing newline
        current_tour_buffer = []
        new_lines.append(line)

# Handle any remaining lines
new_lines.extend(current_tour_buffer)

# Write back
with open('app/tours/tour-data.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully fixed and regenerated tags in tour-data.ts")
