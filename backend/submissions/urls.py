from django.urls import path
from .views import SubmissionListCreateView,SubmissionRetrieveUpdateDeleteView

urlpatterns = [
    path('create/', SubmissionListCreateView.as_view(),name='submission-list-create',), 
    path('submissions/<int:pk>/', SubmissionRetrieveUpdateDeleteView.as_view(), name='submission-detail')
]