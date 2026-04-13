from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Submission
from .serializers import SubmissionSerializers


class SubmissionListCreateView(generics.ListCreateAPIView):
    serializer_class=SubmissionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) == "admin":
            return Submission.objects.all()
        return Submission.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubmissionRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubmissionSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user=self.request.user 
        if getattr(user,"role", None):
            return Submission.objects.all()
        return Submission.objects.filter(user=user)