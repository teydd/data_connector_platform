from .views import ConnectionListCreateView
from django.urls import path

urlpatterns = [
    path('create/',ConnectionListCreateView.as_view()),
]