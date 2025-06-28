import os
import pytesseract
import re
from pdf2image import convert_from_path



def extract_ocr_pdf(pdf_path,poppler_path=None):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at path: {pdf_path}")

    try:
        images = convert_from_path(pdf_path,dpi=300,poppler_path=poppler_path)
        full_text = ""

        for page_number, image in enumerate(images, start=1):
            text = pytesseract.image_to_string(image)
            full_text += f"\n\n--- Page {page_number} ---\n{text.strip()}"

        print(full_text)
        return {
            "pdf_path": pdf_path,
            "raw_text": full_text
        }

    except Exception as extraction_error:
        print(f'Error Extracting the Content From the PDF Using OCR, Error {extraction_error}')
        return {
            "pdf_path": pdf_path,
            "error": str(extraction_error)
        }



def split_cv_sections(text):

    sections = {
        "summary": "",
        "experience": "",
        "projects": "",
        "skills": "",
        "education": "",
        "certifications": "",
        "languages": "",
        "others": ""
    }

    section_patterns = {
        "summary": r"(summary|profile|objective)",
        "experience": r"(experience|employment|work history)",
        "projects": r"(projects|personal projects|project experience)",
        "skills": r"(skills|technical skills)",
        "education": r"(education|academic background)",
        "certifications": r"(certifications|courses|licenses)",
        "languages": r"(languages|spoken languages)"
    }

    lines = text.splitlines()
    current_section = "others"

    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue

        lower_line = clean_line.lower()

        matched = False
        for section, pattern in section_patterns.items():
            if re.match(pattern, lower_line):
                current_section = section
                matched = True
                break

        sections[current_section] += clean_line + "\n"

    return sections