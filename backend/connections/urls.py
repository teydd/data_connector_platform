from .views import ConnectionListCreateView,ConnectionRetrieveUpdateDelete, ConnectionSchemaView,ExtractBatchView
from django.urls import path

urlpatterns = [
    path('connect/', ConnectionListCreateView.as_view(), name='create-connection'),
    path('connections/<int:pk>/', ConnectionRetrieveUpdateDelete.as_view(), name='connection-detail'),
    path('<int:pk>/test/', ConnectionRetrieveUpdateDelete.as_view(), name='test-connection'),  # you may want a dedicated view here
    path('connections/<int:pk>/schema/', ConnectionSchemaView.as_view(), name='connection-schema'),
    path('connections<int:pk>/extract/', ExtractBatchView.as_view(), name='extract-batch'),
]