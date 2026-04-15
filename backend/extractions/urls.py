from django.urls import path
from .views import ExtractListCreateView, ExtractionDetailView

urlpatterns = [
    path("extract/", ExtractListCreateView.as_view(), name="extraction-list"),
    path("extract/<int:pk>/", ExtractionDetailView.as_view(), name="extraction-detail"),
]
