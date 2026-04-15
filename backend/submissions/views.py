# views.py
from rest_framework import generics
from rest_framework.response import Response
from django.utils import timezone
import json, csv, os
from .models import Submission
from .serializers import SubmissionSerializers

class SubmissionListCreateView(generics.ListCreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializers

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) == "admin":
            return Submission.objects.all()
        return Submission.objects.filter(user=user) | Submission.objects.filter(shared_with=user)

    def perform_create(self, serializer):
        submission = serializer.save(user=self.request.user)

        # ✅ Dual storage
        timestamp = timezone.now().strftime("%Y%m%d_%H%M%S")
        base_dir = os.path.join("storage", "submissions")
        os.makedirs(base_dir, exist_ok=True)

        # JSON snapshot
        json_path = os.path.join(base_dir, f"{submission.title}_{timestamp}.json")
        with open(json_path, "w") as f:
            json.dump({
                "title":submission.title,
                "database_type": submission.database_type,
                "timestamp":timestamp,
                "batch_size":submission.batch_size,
                "documentation": submission.documentation
            }, f, indent=2)

        # CSV snapshot
        csv_path = os.path.join(base_dir, f"{submission.title}_{timestamp}.csv")
        with open(csv_path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["title", "database_type", "documentation", "batch_size", "timestamp"])
            writer.writerow([submission.title,
                             submission.database_type,
                             submission.documentation,
                             submission.batch_size,       
                             timestamp])
        user = self.request.user
        if getattr(user, "role", None) == "admin":
            return Submission.objects.all()
        return Submission.objects.filter(user=user) | Submission.objects.filter(shared_with=user)

class SubmissionRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Submission.objects.all().order_by("-submitted_at")
    serializer_class = SubmissionSerializers