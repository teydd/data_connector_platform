from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Extraction
from .serializers import ExtractionSerializers
from connections.drivers.factory import get_connector
from .extractor import fetch_tables, fetch_data

class ExtractionListCreateView(generics.ListCreateAPIView):
    serializer_class = ExtractionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) == "admin":
            return Extraction.objects.all()
        return Extraction.objects.filter(user=user) | Extraction.objects.filter(shared_with=user)

    def create(self, request, *args, **kwargs):
        db_type = request.data.get("database_type")
        table = request.data.get("table")
        batch_size = int(request.data.get("batch_size", 100))

    # get connector based on db_type
        connector = get_connector({       
        "database_type": db_type,
        "host": request.data.get("host"),
        "port": request.data.get("port"),
        "username": request.data.get("username"),
        "password": request.data.get("password"),
        "database_name": request.data.get("database_name"),
        })
        
        connector.connect()
        data = connector.fetch_data(table, batch_size)
        connector.close()

        user_metadata = request.data.get("metadata", {})
        if isinstance(user_metadata, str):
             import json
             user_metadata = json.loads(user_metadata)
             serializer = self.get_serializer(data=request.data)
             serializer.is_valid(raise_exception=True)
             serializer.save(user=request.user, metadata=user_metadata)
        
        return Response({
        "extraction": serializer.data,
        "data": data
    })




class ExtractionRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExtractionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user 
        if getattr(user, "role", None) == "admin":
            return Extraction.objects.all()
        return Extraction.objects.filter(user=user) | Extraction.objects.filter(shared_with = user)