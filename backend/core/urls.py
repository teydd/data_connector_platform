from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("api/", include('accounts.urls')),
    path('api/login/', TokenObtainPairView.as_view()),]
