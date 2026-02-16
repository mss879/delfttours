import json
import re

with open("app/tours/tour-data.ts", "r") as f:
    content = f.read()
    match = re.search(r"export const tourDetails: TourDetail\[\] = (\[.*\]);", content, re.DOTALL)
    if match:
        tours = json.loads(match.group(1))
        print(f"Total tours in file: {len(tours)}")
        for i, tour in enumerate(tours):
            print(f"{i+1}. {tour['id']} - {tour['title'][:30]}...")
    else:
        print("Could not parse file")
