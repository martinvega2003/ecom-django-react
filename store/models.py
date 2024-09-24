#Los imports de abajo son para las imagenes:
from io import BytesIO
from PIL import Image
from django.core.files import File

from django.db import models

# Create your models here.

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField() #

    class Meta:
        ordering = ("name", ) #

    def __str__(self):
        return self.name
    
    def get_absolute_url(self): #
        return "/" + {self.slug} + "/"

class Product(models.Model):
    name = models.CharField(max_length=100)
    inventory = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    isDiscounted = models.BooleanField(default=False)
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="uploads/", blank=True, null=True)
    addedDate = models.DateField(auto_now_add=True)
    slug = models.SlugField()

    class Meta:
        ordering = ("-addedDate", )

    def __str__(self):
        return self.name

    #self.category es lo mismo que una cllase del modelo Category, por lo que tiene un atributo slug    
    def get_absolute_url(self):
        return "/" + {self.category.slug} + "/" + {self.slug} + "/"
    
    #Se le pasa la cantidad comprada como argumento y se reduce en esa cantidad si hay inventario disponible
    def reduceStock(self, quantity):
        if self.inventory >= quantity:
            self.inventory -= quantity
            self.save()
            return True
        return False
    
    #Aca se agrega la cantidad publicada al inventario
    def addStock(self, quantity):
        if quantity > 0:
            self.inventory += quantity
            self.save()
            return True
        return False
    
    #Retornamos la url de Image si existe
    def getImage(self):
        if self.image: #Si existe la imagen
            return "http://127.0.0.1:8000" + self.image.url #Se le pasa toda la url
        return ""

    #Retornamos la url de thubnail si existe
    def getThumbnail(self):
        if self.thumbnail:
            return "http://127.0.0.1:8000" + self.thumbnail.url #Se le pasa toda la url
        elif self.image: #Si existe la imagen pero no la portada:
            self.thumbnail = self.createThumbnail(self.image) #Ejecutamos la funcion para crear la portada
            self.save()
            return "http://127.0.0.1:8000" + self.thumbnail.url 
        else:
            return ""
        
    #Creamos la portada a partir de la imagen
    def createThumbnail(self, image, size=(400, 250)): #El tamaño lo tenemos por defecto
        img = Image.open(image) #Image es lo que importamos de arriba, creamos una imagen a partir de la que pasamos como argumento
        img.convert("RGB") #La covertimos a RGB
        img.thumbnail(size) #thumbnail es una funcion que ya viene con Image.

        thumbnailIo = BytesIO()
        img.save(thumbnailIo, "JPEG", quality=100) #Guardamos la imagen
        thubnail = File(thumbnailIo, name=image.name) #File tambien lo importamos de arriba
        return thubnail #Se retorna la portada que se creo a partir de la imagen que pasamos de argumentos.
