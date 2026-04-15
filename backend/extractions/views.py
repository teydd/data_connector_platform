from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Extraction
from .serializers import ExtractionSerializers
from .services.extraction_runner import run_extraction

# List + Create
class ExtractListCreateView(generics.ListCreateAPIView):
    queryset = Extraction.objects.all()
    serializer_class = ExtractionSerializers

    def perform_create(self, serializer):
        # Automatically set the user to the request user
        serializer.save(user=self.request.user)


# Retrieve + Update + Delete
class ExtractionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Extraction.objects.all()
    serializer_class = ExtractionSerializers


# Dedicated Run Endpoint
class ExtractionRunView(generics.GenericAPIView):
    queryset = Extraction.objects.all()
    serializer_class = ExtractionSerializers

    def post(self, request, pk):
        try:
            extraction = self.get_object()  # uses queryset + pk
            result = run_extraction(extraction)
            return Response(result, status=status.HTTP_200_OK)
        except Extraction.DoesNotExist:
            return Response({"error": "Extraction not found"}, status=status.HTTP_404_NOT_FOUND)
