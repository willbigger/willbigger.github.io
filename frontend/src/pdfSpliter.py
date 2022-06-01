import pdfplumber

with pdfplumber.open("/Users/skg/Desktop/nicu/Chapter 7_Pharmacy tables 2021.pdf") as pdf:
    first_page = pdf.pages[0]
    print(first_page.extract_text())