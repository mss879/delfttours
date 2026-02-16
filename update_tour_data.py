import re

file_path = 'app/tours/tour-data.ts'

updates = {
    "SL-5D4N-STD-05": {
        "map": "5 day island escape.png",
        "img": "/package-previews/SL-5D4N-STD-05.jpg"
    },
    "SL-6D5N-STD-01": {
        "map": "6 days island charm express.png",
        "img": "/package-previews/SL-6D5N-STD-01.jpg"
    },
    "SL-6D5N-STD-02": {
        "map": "6 day tropical days.png",
        "img": "/package-previews/SL-6D5N-STD-02.jpg"
    },
    "SL-11D10N-STD-01": {
        "map": "10 days sri lanka dream route.png",
        "img": "/package-previews/SL-11D10N-STD-01.jpg"
    },
    "SL-12D11N-STD-01": {
        "map": "12 days ceylon panorama journey.png",
        "img": "/package-previews/SL-12D11N-STD-01.jpg"
    },
    "SL-12D11N-HNM-02": {
        "map": "12 days dreamy honeymoon days.png",
        "img": "/package-previews/SL-12D11N-HNM-02.jpg"
    },
    "SL-14D13N-CLT-01": {
        "map": None,
        "img": "/package-previews/SL-14D13N-CLT-01.jpg"
    },
    "SL-13D12N-STD-01": {
        "map": None,
        "img": "/package-previews/SL-13D12N-STD-01.jpg"
    }
}

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for tour_id, data in updates.items():
    # Regex to find the tour block by ID
    # Look for "id": "TOUR_ID" ... "images": [ "OLD_IMG_1", ... ]
    # We want to replace the images block and optionally add mapImage before it.
    
    # Pattern to find the start of images array for a specific tour ID
    # We search for ID, then scan ahead to "images": [
    pattern = r'("id":\s*"' + re.escape(tour_id) + r'",.*?)"images":\s*\[\s*"(.*?)"'
    
    # We use non-greedy .*? and DOTALL flag
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        print(f"Found match for {tour_id}")
        full_match = match.group(0)
        pre_images = match.group(1) # Everything before "images": [
        first_image = match.group(2) # The URL of the first image
        
        # specific replacement
        new_images_start = '"images": [\n      "' + data["img"] + '"'
        
        # If there is a map, insert it before images
        if data["map"]:
             replacement = pre_images + f'"mapImage": "{data["map"]}",\n    ' + new_images_start
        else:
             replacement = pre_images + new_images_start
             
        # We need to replace the exact matched string with our replacement
        # Careful: construct the replacement to match the captured structure exactly except for the changes
        
        # Actually proper regex sub is better but finding the range is safer
        start, end = match.span()
        
        # We only want to replace the matched part
        # "images": [ "OLD_URL" -> "images": [ "NEW_URL" 
        # But wait, if I use string replacement I might mess up formatting.
        
        # Let's try string replacement on the MATCHED text.
        original_chunk = content[start:end]
        
        # Determine strict replacement
        # content[start:end] covers from "id": ... to "images": [ "OLD_image_url"
        
        # Reconstruct:
        # 1. part before "images"
        # 2. insert map if needed
        # 3. "images": [
        # 4. "NEW_image_url"
        
        new_chunk = original_chunk.replace(f'"{first_image}"', f'"{data["img"]}"')
        
        if data["map"]:
             # Insert mapImage before "images"
             # Find "images" in new_chunk
             img_idx = new_chunk.rfind('"images"')
             if img_idx != -1:
                 # Check indentation logic: usually it's "    "
                 new_chunk = new_chunk[:img_idx] + f'"mapImage": "{data["map"]}",\n    ' + new_chunk[img_idx:]
        
        content = content[:start] + new_chunk + content[end:]
        
        print(f"Updated {tour_id}")
    else:
        print(f"Could not find {tour_id}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
