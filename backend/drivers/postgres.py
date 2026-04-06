import psycopg2
from .root import RootDriver

class PostgresDriver(RootDriver):

    def __init__(self,config):
        self.config = config
        self.conn = None

    def connect(self):
        self.conn = psycopg2.connect(
            host=self.config.host,
            port=self.config.port,
            user=self.config.username,
            password=self.config.password,
            dbname=self.config.database_name,
        )
    
    def test_connection(self):
        try:
            self.connect()
            return True
        except Exception as e:
            return str(e)
        finally:
            if self.conn:
                self.conn.close()

    
    def close(self):
        if self.conn:
            self.conn.close()
