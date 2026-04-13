from rest_framework import generics
from .models import Connection
from .serializers import DatabaseUpdateSerializer, DatabaseCreateSerializer
from rest_framework.permissions import IsAuthenticated
from .utils import get_connection_config, test_connection
from .drivers.factory import get_connector
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class ConnectionListCreateView(generics.ListCreateAPIView):
    serializer_class = DatabaseCreateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if getattr(user,"admin",None):
            return Connection.objects.all()
        return Connection.objects.filter(created_by=user)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ConnectionRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DatabaseUpdateSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if getattr(user, "admin", None):
            return Connection.objects.all()
        return Connection.objects.filter(created_by=user)



class ConnectionSchemaView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        connection = get_object_or_404(Connection, pk=pk)
        config = get_connection_config(connection)
        connector = get_connector(config)
        with connector:
            tables = connector.get_tables()
        return Response({"tables": tables})


class ExtractBatchView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        connection = get_object_or_404(Connection, pk=pk)
        config = get_connection_config(connection)
        connector = get_connector(config)

        table_name = request.query_params.get("table")
        batch_size = int(request.query_params.get("batch_size", 100))
        offset = int(request.query_params.get("offset", 0))

        with connector:
            data = connector.extract_batch(table_name, batch_size, offset)

        return Response({"data": data})