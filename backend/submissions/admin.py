from django.contrib import admin
from .models import Submission

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'database_type', 'repo_link', 'submitted_at')
    search_fields = ('user__username', 'repo_link')
