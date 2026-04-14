from django.db import models
from django.conf import settings
from connections.models import Connection


class Submission(models.Model):
    DB = [
        ('postgresql', 'PostgreSQL'),
        ('mysql', 'MySQL'),
        ('mongodb', 'MongoDB'),
        ('clickhouse', 'ClickHouse'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    database_type = models.CharField(
    max_length=20,
    choices=DB,
    null=True,
    blank=True,
    default=None
)
    title = models.CharField(max_length=255, null=True, blank=True)
    file_upload = models.FileField(upload_to="submissions/", blank=True)
    repo_link = models.URLField(blank=True, null=True)
    video_link = models.URLField(blank=True, null=True)
    documentation = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True, null=True)


    def __str__(self):
        return f"{self.user} -> {self.database_type}"