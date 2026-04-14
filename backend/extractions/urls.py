from .views import ExtractionListCreateView, ExtractionRetrieveUpdateDelete
from django.urls import path, include

urlpatterns = [
    path('extract/',ExtractionListCreateView.as_view()),
    path('extract/<int:pk>/', ExtractionRetrieveUpdateDelete.as_view())
]