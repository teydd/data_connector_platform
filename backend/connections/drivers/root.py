from abc import ABC, abstractmethod

class RootDriver(ABC):

    def __init__(self, config):
        self.config = config

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
    def close(self):
        pass