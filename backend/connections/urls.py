from .views import ConnectionListCreateView,ConnectionRetrieveUpdateDelete, ConnectionSchemaView,ExtractBatchView
from django.urls import path

urlpatterns = [
    path('create/', ConnectionListCreateView.as_view(), name='create-connection'),
    path('<int:pk>/', ConnectionRetrieveUpdateDelete.as_view(), name='connection-detail'),
    path('<int:pk>/test/', ConnectionRetrieveUpdateDelete.as_view(), name='test-connection'),  # you may want a dedicated view here
    path('<int:pk>/schema/', ConnectionSchemaView.as_view(), name='connection-schema'),
    path('<int:pk>/extract/', ExtractBatchView.as_view(), name='extract-batch'),
]