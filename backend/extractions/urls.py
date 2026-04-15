from django.urls import path
from .views import ExtractListCreateView, ExtractionDetailView, ExtractionRunView

urlpatterns = [
    path("extractions/", ExtractListCreateView.as_view(), name="extraction-list"),
    path("extractions/<int:pk>/", ExtractionDetailView.as_view(), name="extraction-detail"),
    path("extractions/<int:pk>/extract/", ExtractionRunView.as_view(), name="extraction-run"),
]