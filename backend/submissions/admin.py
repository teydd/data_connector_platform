from django.contrib import admin
from .models import Submission

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "database_type", "user", "database_name", "submitted_at",)
    search_fields = ('user__username',)
