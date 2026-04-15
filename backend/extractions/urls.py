from django.urls import path
from .views import ExtractListCreateView, ExtractionDetailView, ExtractionRunView

urlpatterns = [
    path("", ExtractListCreateView.as_view(), name="extraction-list"),
    path("<int:pk>/", ExtractionDetailView.as_view(), name="extraction-detail"),
    path("<int:pk>/extract/", ExtractionRunView.as_view(), name="extraction-run"),
]