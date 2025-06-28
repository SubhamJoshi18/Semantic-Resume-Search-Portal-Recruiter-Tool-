import os
import json
from Extraction.PDFExtraction import extract_ocr_pdf, split_cv_sections
from Publisher.ElasticPublisher import publish_to_elastic_consumers


def resume_extraction_handler(payload):
    try:
        if not isinstance(payload,dict) and 'pdfPath' not in payload:
            raise ValueError("Invalid message format. Must contain 'pdfPath' key.")

        pdf_path = payload["pdfPath"]
        print(f"[INFO] Processing and Extracting the  PDF at: {pdf_path}")
        ocr_result = extract_ocr_pdf(pdf_path)
        raw_text = ocr_result.get("raw_text", "")
        structured_sections = split_cv_sections(raw_text)
        final_result = {
            "pdf_path": pdf_path,
            "sections": structured_sections
        }
        json_output_path = os.path.splitext(pdf_path)[0] + "_structured_cv.json"

        with open(json_output_path, "w") as outfile:
            json.dump(final_result, outfile, indent=2)

        print(f"[SUCCESS] Structured CV saved to: {json_output_path}")

        print(f'Publishing the Message to the Elastic Consumer')


        with open(json_output_path,'r',encoding='utf-8') as file:
            try:
                structured_json_data = json.load(file)
            except json.decoder.JSONDecodeError as json_error:
                print(f'Error Decoding the JSON: {json_error}')
                return
        json_queue_payload = json.dumps(structured_json_data)
        print(f'Publishing the Payload to the Elastic Consumer')
        publish_to_elastic_consumers(json_queue_payload)
    except Exception as error:
            print(f'Error Extracting the PDF Content Handler, Error {error}')