from abc import ABC, abstractmethod

class RootDriver(ABC):

    def __init__(self, config):
        self.config = config
        self.connection = None

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def test_connection(self):
        pass

    @abstractmethod
    def query(self, query):
        pass

    @abstractmethod
    def fetch_tables(self):
        pass

    @abstractmethod
    def fetch_data(self, table: str, batch_size: int = 100, offset: int=0):
        pass

    @abstractmethod
    def close(self):
        pass