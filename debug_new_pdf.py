import pypdf

def clean_text(text):
    return text.replace("  ", "|||").replace(" ", "").replace("|||", " ")

pdf_path = r"c:\Users\Shahid\Downloads\69-103.pdf"

try:
    reader = pypdf.PdfReader(pdf_path)
    print(f"Number of pages: {len(reader.pages)}")
    print("--- Page 1 Content Cleaned ---")
    print(clean_text(reader.pages[0].extract_text()))
    print("--- End Page 1 ---")
except Exception as e:
    print(f"Error reading PDF: {e}")
