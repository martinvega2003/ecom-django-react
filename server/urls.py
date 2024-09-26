from django.contrib import admin
from django.urls import path, include
#Importamos funciones para configurar la url donde se subiran los documentos de imagenes:
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    #Agregamos urls de las librerias:
    path("api/v1/", include("djoser.urls")),
    path("api/v1/", include("djoser.urls.authtoken")),
    path("api/v1/store/", include("store.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) #Le agregamos la funcion static con estos argumentos.
