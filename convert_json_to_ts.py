import json

with open("extracted_tours.json", "r") as f:
    tours = json.load(f)

ts_content = "export type TourDetail = {\n  id: string;\n  title: string;\n  description: string;\n  images: string[];\n  days: { title: string; description: string }[];\n  inclusions: string[];\n};\n\n"
ts_content += "export const tourDetails: TourDetail[] = " + json.dumps(tours, indent=2) + ";\n"

# Add placeholder images since we couldn't extract them
# We can cycle through some placeholders
ts_content = ts_content.replace('"images": []', '"images": ["/assets/tour/hero.jpg", "/assets/tour/thumb1.jpg"]') # Basic replace if field existed (it didn't)

# Let's inject images into the JSON structure before dumping
for tour in tours:
    tour["images"] = [
        "/assets/tour/hero.jpg", 
        "/assets/tour/thumb1.jpg", 
        "/assets/tour/thumb2.jpg"
    ]

# Re-dump
ts_content = "export type TourDetail = {\n  id: string;\n  title: string;\n  description: string;\n  images: string[];\n  days: { title: string; description: string }[];\n  inclusions: string[];\n};\n\n"
ts_content += "export const tourDetails: TourDetail[] = " + json.dumps(tours, indent=2) + ";\n"

with open(r"app/tours/tour-data.ts", "w") as f:
    f.write(ts_content)
