import pypdf
import re
import json

def clean_text(text):
    # Based on observation: 2 spaces = word break, 1 space = in-word spacing
    return text.replace("  ", "|||").replace(" ", "").replace("|||", " ")

pdf_path = r"c:\Users\Shahid\Downloads\3-37 packages.pdf"
reader = pypdf.PdfReader(pdf_path)

full_text = ""
for page in reader.pages:
    extracted = page.extract_text()
    if extracted:
        full_text += clean_text(extracted) + "\n"

# Split by Tour ID pattern: SL-XXXX-XXXX-XX
# Regex to find IDs: SL-[A-Z0-9]+-[A-Z]+-[0-9]+ or similar
# Observed: SL-3D2N-CTY-01
# Let's try to match SL- followed by alphanumeric characters and dashes
tour_split_pattern = r"(SL-[A-Z0-9]+-[A-Z]+-[0-9]+)"

parts = re.split(tour_split_pattern, full_text)

tours = []
current_tour = {}

# The splits will be [preamble, ID1, content1, ID2, content2, ...]
# So we iterate from index 1 in steps of 2

for i in range(1, len(parts), 2):
    tour_id = parts[i].strip()
    content = parts[i+1]
    
    # Simple extraction logic (can be refined)
    
    # 1. Title: Usually right after ID
    # Split by newline
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    
    title = ""
    if lines:
        title = lines[0] # Often the title is the first line
        # Sometimes title spans 2 lines
        if len(lines) > 1 and not lines[1].startswith("Destination:"):
             title += " " + lines[1]
    
    # 2. Extract Days
    # Look for "Day X" or "Day X:" patterns
    days = []
    # Pattern: Day \d+ or Day \d : or Day \d –
    day_matches = re.finditer(r"(Day\s*\d+\s*[–:-].*?)(?=(Day\s*\d+)|(Pricing)|$)", content, re.DOTALL | re.IGNORECASE)
    
    for match in day_matches:
        day_text = match.group(1).strip()
        # Clean up day text
        # Usually format: "Day 1 – Title \n • Activity 1 \n • Activity 2"
        # Let's try to parse title and activities
        day_lines = day_text.split('\n')
        day_title = day_lines[0]
        day_desc = "\n".join(day_lines[1:])
        days.append({
            "title": day_title,
            "description": day_desc
        })

    # 3. Extract Inclusions
    inclusions = []
    if "Inclusion" in content:
        inc_section = content.split("Inclusion")[1].split("Exclusion")[0].split("Overview")[0]
        # Heuristic: Uppercase lines or lines with bullet points
        inc_lines = [l.strip() for l in inc_section.split('\n') if l.strip()]
        # Take first 10 lines max as inclusions usually short list
        inclusions = inc_lines[:10]

    # 4. Extract Description
    description = ""
    if "Overview:" in content:
        desc_part = content.split("Overview:")[1]
        # Take until next Section (Day 1)
        desc_part = re.split(r"Day\s*1", desc_part)[0]
        description = desc_part.strip()
    
    tours.append({
        "id": tour_id,
        "title": title,
        "description": description,
        "days": days,
        "inclusions": inclusions
    })

print(json.dumps(tours, indent=2))
with open("extracted_tours.json", "w") as f:
    json.dump(tours, f, indent=2)
