from rest_framework import generics,status
from rest_framework.response import Response
from .models import Connection
from .serializers import DatabaseSerializers, DatabaseCreateSerializer
from .drivers.factory import get_connector

class ConnectionListCreateView(generics.ListCreateAPIView):
    #Creates and Posts requests
    queryset = Connection.objects.all()
    serializer_class = DatabaseCreateSerializer

class ConnectionRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    #Get Update Deleting requests
    queryset = Connection.objects.all()
    serializer_class = DatabaseSerializers