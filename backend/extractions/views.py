from rest_framework import generics
from .models import Extraction
from .serializers import ExtractionSerializers

class ExtractListCreateView(generics.ListCreateAPIView):
    queryset = Extraction.objects.all()
    serializer_class = ExtractionSerializers

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExtractionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Extraction.objects.all()
    serializer_class =ExtractionSerializers
