from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegisterView, name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("user/", views.UserView.as_view(), name="user"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
]