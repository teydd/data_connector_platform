# services/extraction_runner.py
from extractions.models import Extraction
from connections.drivers.factory import get_connector
import csv
import os
from django.conf import settings

def save_results_to_csv(extraction, results):
    folder = os.path.join(settings.MEDIA_ROOT, "extractions")
    os.makedirs(folder, exist_ok=True)

    file_name = f"extraction_{extraction.id}.csv"
    file_path = os.path.join(folder, file_name)

    with open(file_path, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        for row in results:
            writer.writerow(row)

    # Save relative path for HTTP serving
    extraction.result_location = f"{settings.MEDIA_URL}extractions/{file_name}"
    extraction.save()

    return extraction.result_location


def run_extraction(extraction):
    connector = get_connector(extraction.connection)
    results = connector(extraction)
    file_path = save_results_to_csv(extraction, results)
    return {"preview": results[:10], "download": file_path}
