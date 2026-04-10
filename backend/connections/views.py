from rest_framework import generics
from .models import Connection
from .serializers import DatabaseSerializers, DatabaseCreateSerializer

class ConnectionListCreateView(generics.ListCreateAPIView):
    #Creates and Posts requests
    queryset = Connection.objects.all()
    serializer_class = DatabaseCreateSerializer

class ConnectionRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    #Get Update Deleting requests
    queryset = Connection.objects.all()
    serializer_class = DatabaseSerializers