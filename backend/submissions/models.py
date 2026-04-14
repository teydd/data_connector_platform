from django.db import models
from django.conf import settings
from connections.models import Connection


class Submission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    connection = models.ForeignKey(Connection, null=True, blank=True, on_delete=models.CASCADE)
    table = models.CharField(max_length=255, null=True, blank=True)
    collection = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    file_upload = models.FileField(upload_to="submissions/", blank=True)
    metadata = models.JSONField(null=True, blank=True)
    documentation = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True, null=True)


    def __str__(self):
        return f"{self.user} -> {self.connection}"