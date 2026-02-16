import pypdf
import re

pdf_path = r"c:\Users\Shahid\Downloads\3-37 packages.pdf"
reader = pypdf.PdfReader(pdf_path)
text = reader.pages[0].extract_text()

# Replace double spaces with a marker
text_marker = text.replace("  ", "|")
# Remove single spaces
text_cleaned = text_marker.replace(" ", "")
# Replace marker with single space
text_final = text_cleaned.replace("|", " ")

print("--- ORIGINAL ---")
print(text[:500])
print("\n--- CLEANED ---")
print(text_final[:500])
