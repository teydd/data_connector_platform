from django.db import models
from django.conf import settings
from connections.models import Connection


class Submission(models.Model):
    DB = [
        ('postgresql', 'PostgreSQL'),
        ('mysql', 'MySQL'),
        ('mongodb', 'MongoDB'),
        ('clickhouse', 'ClickHouse')
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    database_name = models.ForeignKey(Connection,on_delete=models.CASCADE, null=True, blank=True)
    database_type = models.CharField(max_length=20 , choices=DB, null=True, blank=True)
    table = models.CharField(max_length=255, null=True, blank=True)
    collection = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    file_upload = models.FileField(upload_to="submissions/", blank=True)
    batch_size = models.IntegerField(null=True, blank=True)
    documentation = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
          return f"{self.title or 'Untitled'} ({self.database_type or 'No DB'})"