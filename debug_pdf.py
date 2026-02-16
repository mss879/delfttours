import pypdf
import os

pdf_path = r"c:\Users\Shahid\Downloads\3-37 packages.pdf"

if not os.path.exists(pdf_path):
    print(f"Error: {pdf_path} not found")
    exit(1)

reader = pypdf.PdfReader(pdf_path)
text_sample = ""
# Extract first 5 pages to analyze structure
for i in range(min(5, len(reader.pages))):
    text_sample += f"--- PAGE {i+1} ---\n"
    text_sample += reader.pages[i].extract_text()
    text_sample += "\n"

print(text_sample)
