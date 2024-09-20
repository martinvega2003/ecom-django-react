from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    #Agregamos urls de las librerias:
    path("apli/v1/", include("djoser.urls")),
    path("apli/v1/", include("djoser.urls.authtoken")),
]
