import pypdf

def clean_text(text):
    return text.replace("  ", "|||").replace(" ", "").replace("|||", " ")

pdf_path = r"c:\Users\Shahid\Downloads\38-68.pdf"
reader = pypdf.PdfReader(pdf_path)

full_text = ""
for i in range(3): # Check first 3 pages
    extracted = reader.pages[i].extract_text()
    if extracted:
        full_text += clean_text(extracted) + "\n-------------------\n"

print(full_text)
