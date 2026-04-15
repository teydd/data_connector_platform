# services/extraction_runner.py
from .models import Extraction
from connections.drivers.factory import get_connector

def run_extraction(extraction: Extraction):
    connector = get_connector(extraction.connection)
    results = connector(extraction)
    return results
