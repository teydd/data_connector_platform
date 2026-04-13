from pymongo import MongoClient
from .root import RootDriver

class MongoDBConnector(RootDriver):

    def connect(self):
        uri = (
            f"mongodb://{self.config['username']}:{self.config['password']}" 
            f"@{self.config['host']}:{self.config['port']}/"
        )
        self.client = MongoClient(uri , serverSelectionTimeoutMS=10000)

        self.connection = self.client[self.config['database_name']]

    def test_connection(self) -> bool:
        try:
            self.connect()
            self.client.admin.command('ping')
            self.close()
            return True
        except Exception:
            return False       
       
    def query(self, collection_name, filter_query=None):
        try:
            return list(self.connection[collection_name].find(filter_query or {}))
        except Exception as e:
            return f"Mongo query failed: {e}"
        
    def fetch_tables(self) -> list:
        return self.connection.list_collection_names()
    
    def fetch_data(self, table, batch_size = 100, offset = 0):
        collection = self.connection[table]
        total = collection.count_documents({})

        # MongoDB returns documents (dicts with "_id" field)
        cursor = collection.find({}).skip(offset).limit(batch_size)
        rows = []
        for doc in cursor:
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string (JSON serializable)
            rows.append(doc)

        # Get all unique keys as "columns"
        columns = list(rows[0].keys()) if rows else []

        return {"columns": columns, "rows": rows, "total": total}
    

    def close(self):
        if hasattr(self, "client") and self.client:
             self.client.close()
             print("MongoDB connection closed")