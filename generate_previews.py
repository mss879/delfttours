import os
from PIL import Image, ImageDraw, ImageFont
import random

packages = []

# Read from tour-data.ts
import re
with open("app/tours/tour-data.ts", "r", encoding="utf-8") as f:
    content = f.read()
    
# Find matches. Assuming JSON-like structure inside the TS file
# "id": "SL-...",
# "title": "...",
matches = re.findall(r'"id":\s*"(SL-[^"]+)"\s*,\s*"title":\s*"(.*?)"', content)

for mid, mtitle in matches:
    # Title might be escaped JSON string, e.g. "foo \"bar\""
    # But for now simple is ok
    packages.append({"id": mid, "title": mtitle})

print(f"Found {len(packages)} packages in tour-data.ts")


output_dir = "public/package-previews"
os.makedirs(output_dir, exist_ok=True)

for pkg in packages:
    # random pastel color
    color = (random.randint(150, 255), random.randint(150, 255), random.randint(150, 255))
    img = Image.new('RGB', (800, 600), color=color)
    d = ImageDraw.Draw(img)
    
    # Try to load a font, otherwise fail gracefully with default
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except IOError:
        font = ImageFont.load_default()

    text = pkg["title"]
    # Calculate text position (centering manually if default font, or using bbox)
    # Simple aesthetic placement
    d.text((50, 250), text, fill=(0, 0, 0), font=font)
    d.text((50, 320), f"ID: {pkg['id']}", fill=(50, 50, 50), font=font)
    
    filename = f"{pkg['id']}.jpg"
    img.save(os.path.join(output_dir, filename))
    print(f"Generated {filename}")
