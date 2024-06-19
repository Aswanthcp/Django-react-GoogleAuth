from django.urls import path
from .views import GoogleLoginApi

urlpatterns = [
    path("auth/google/", GoogleLoginApi.as_view(), name="login-with-google"),
]
