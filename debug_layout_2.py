import pypdf

def clean_text(text):
    return text.replace("  ", "|||").replace(" ", "").replace("|||", " ")

pdf_path = r"c:\Users\Shahid\Downloads\38-68.pdf"
reader = pypdf.PdfReader(pdf_path)

full_text = ""
start_page = 3
for i in range(start_page, min(start_page+4, len(reader.pages))): 
    extracted = reader.pages[i].extract_text()
    if extracted:
        full_text += f"\n--- PAGE {i+1} ---\n" + clean_text(extracted)

print(full_text)
