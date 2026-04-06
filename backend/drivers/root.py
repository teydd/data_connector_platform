from abc import ABC, abstractmethod

class RootDriver(ABC):

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def test_connection(self):
        pass

    @abstractmethod
    def close(self):
        pass