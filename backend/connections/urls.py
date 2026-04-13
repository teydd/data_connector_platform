from .views import ConnectionListCreateView,ConnectionRetrieveUpdateDelete
from django.urls import path

urlpatterns = [
    path('create/',ConnectionListCreateView.as_view(), name='create-connection'),
    path('update/<int:pk>/', ConnectionRetrieveUpdateDelete.as_view(), name='update-conection')
]