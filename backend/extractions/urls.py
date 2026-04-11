from .views import ExtractionListCreateView, ExtractionRetrieveUpdateDelete
from django.urls import path, include

urlpatterns = [
    path('extractions/',ExtractionListCreateView.as_view()),
    path('extractions/<int:pk>/', ExtractionRetrieveUpdateDelete.as_view())
]