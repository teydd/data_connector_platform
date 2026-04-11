from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Extraction
from .serializers import ExtractionSerializers

class ExtractionListCreateView(generics.ListCreateAPIView):
    serializer_class = ExtractionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user,"role", None) == "admin":
            return Extraction.objects.all()
        return Extraction.objects.filter(user=user) | Extraction.objects.filter(shared_with=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExtractionRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExtractionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user 
        if getattr(user, "role", None) == "admin":
            return Extraction.objects.all()
        return Extraction.objects.filter(user=user) | Extraction.objects.filter(shared_with = user)