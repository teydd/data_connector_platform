from django.urls import path
from .views import SubmissionListCreateView,SubmissionRetrieveUpdateDeleteView

urlpatterns = [
    path('create/', SubmissionListCreateView.as_view(),name='submission-create',), 
    path('submissions/<int:pk>/', SubmissionRetrieveUpdateDeleteView.as_view(), name='submission-detail')
]