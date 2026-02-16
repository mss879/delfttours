import json

# Image Database (from Subagent research)
IMAGE_DB = {
  "Sigiriya": [
    "https://images.pexels.com/photos/31154120/pexels-photo-31154120.jpeg",
    "https://images.pexels.com/photos/32547979/pexels-photo-32547979.jpeg",
    "https://images.pexels.com/photos/30945056/pexels-photo-30945056.jpeg",
    "https://images.pexels.com/photos/32547969/pexels-photo-32547969.jpeg"
  ],
  "Kandy": [
    "https://images.pexels.com/photos/33404365/pexels-photo-33404365.jpeg",
    "https://images.pexels.com/photos/32795550/pexels-photo-32795550.jpeg",
    "https://images.pexels.com/photos/20837042/pexels-photo-20837042.jpeg",
    "https://images.pexels.com/photos/32678292/pexels-photo-32678292.jpeg"
  ],
  "Tea": [
    "https://images.pexels.com/photos/4403937/pexels-photo-4403937.jpeg",
    "https://images.pexels.com/photos/321582/pexels-photo-321582.jpeg",
    "https://images.pexels.com/photos/23506593/pexels-photo-23506593.jpeg",
    "https://images.pexels.com/photos/33345878/pexels-photo-33345878.jpeg"
  ],
  "Beach": [
    "https://images.pexels.com/photos/33404691/pexels-photo-33404691.jpeg",
    "https://images.pexels.com/photos/35251716/pexels-photo-35251716.jpeg",
    "https://images.pexels.com/photos/29644514/pexels-photo-29644514.jpeg",
    "https://images.pexels.com/photos/15689754/pexels-photo-15689754.jpeg"
  ],
  "Wildlife": [
    "https://images.pexels.com/photos/33130315/pexels-photo-33130315.jpeg",
    "https://images.pexels.com/photos/33724002/pexels-photo-33724002.jpeg",
    "https://images.pexels.com/photos/20321536/pexels-photo-20321536.jpeg",
    "https://images.pexels.com/photos/32964276/pexels-photo-32964276.jpeg"
  ],
  "Colombo": [
    "https://images.pexels.com/photos/33418255/pexels-photo-33418255.jpeg",
    "https://images.pexels.com/photos/35133815/pexels-photo-35133815.jpeg",
    "https://images.pexels.com/photos/32451027/pexels-photo-32451027.jpeg",
    "https://images.pexels.com/photos/19759365/pexels-photo-19759365.jpeg"
  ],
  "Romantic": [
    "https://images.pexels.com/photos/34037253/pexels-photo-34037253.jpeg",
    "https://images.pexels.com/photos/30858009/pexels-photo-30858009.jpeg",
    "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg",
    "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg"
  ],
  "Ruins": [
    "https://images.pexels.com/photos/12584869/pexels-photo-12584869.jpeg",
    "https://images.pexels.com/photos/33171754/pexels-photo-33171754.jpeg",
    "https://images.pexels.com/photos/10859267/pexels-photo-10859267.jpeg",
    "https://images.pexels.com/photos/23507034/pexels-photo-23507034.jpeg"
  ]
}

def get_images_for_tour(title, desc):
    title_lower = title.lower()
    desc_lower = desc.lower()
    
    # Priority matching
    if "beach" in title_lower or "coast" in title_lower or "paradise" in title_lower:
        if "honeymoon" in title_lower or "romantic" in title_lower:
            return IMAGE_DB["Romantic"][:2] + IMAGE_DB["Beach"][:1]
        return IMAGE_DB["Beach"]
        
    if "wildlife" in title_lower or "safari" in title_lower or "nature" in title_lower:
        return IMAGE_DB["Wildlife"][:2] + IMAGE_DB["Sigiriya"][:1]
        
    if "culture" in title_lower or "heritage" in title_lower or "temples" in title_lower:
        return IMAGE_DB["Kandy"][:1] + IMAGE_DB["Ruins"][:1] + IMAGE_DB["Sigiriya"][:1]
        
    if "romantic" in title_lower or "honeymoon" in title_lower:
        return IMAGE_DB["Romantic"]

    if "tea" in title_lower or "hill" in title_lower or "nuwara" in title_lower:
        return IMAGE_DB["Tea"][:2] + IMAGE_DB["Kandy"][:1]

    if "colombo" in title_lower:
        return IMAGE_DB["Colombo"]
        
    # Default mix
    return [IMAGE_DB["Sigiriya"][0], IMAGE_DB["Beach"][1], IMAGE_DB["Tea"][0]]

# Load current tours
import re
with open("app/tours/tour-data.ts", "r") as f:
    content = f.read()
    match = re.search(r"export const tourDetails: TourDetail\[\] = (\[.*\]);", content, re.DOTALL)
    if match:
        tours = json.loads(match.group(1))

        # Update images
        for tour in tours:
            tour["images"] = get_images_for_tour(tour["title"], tour["description"])

        # Write back
        ts_content = "export type TourDetail = {\n  id: string;\n  title: string;\n  description: string;\n  images: string[];\n  days: { title: string; description: string }[];\n  inclusions: string[];\n};\n\n"
        ts_content += "export const tourDetails: TourDetail[] = " + json.dumps(tours, indent=2) + ";\n"
        
        with open("app/tours/tour-data.ts", "w") as f:
            f.write(ts_content)
        
        print("Updated images for all tours.")

