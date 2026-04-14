# services/extractor.py
def fetch_tables(connector):
    return connector.fetch_tables()

def fetch_data(connector, table, batch_size=100, offset=0):
    return connector.fetch_data(table, batch_size, offset)
