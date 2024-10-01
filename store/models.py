#Los imports de abajo son para las imagenes:
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils import timezone
from django.db.models import Count

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

class Size(models.Model):
    value = models.CharField(max_length=10)

    def __str__(self):
        return self.value

class Shipping(models.Model):
    DELIVERY_CHOICES = [
        ('10_days', '10 Days Delivery'),
        ('1_week', '1 Week Delivery'),
        ('2_3_days', '2-3 Days Delivery')
    ]
    
    delivery_time = models.CharField(max_length=10, choices=DELIVERY_CHOICES, default='10_days')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    free_shipping = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_delivery_time_display()} - Price: {self.price} - Free Shipping: {'Yes' if self.free_shipping else 'No'}"

class Product(models.Model):

    class ProductType(models.TextChoices):
        TSHIRT = 'TS', 'T-Shirt'
        SHOE = 'SH', 'Shoe'

    name = models.CharField(max_length=100)
    inventory = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    isDiscounted = models.BooleanField(default=False)
    product_type = models.CharField(
        max_length=2,
        choices=ProductType.choices,
        default=ProductType.TSHIRT
    )
    sizes = models.ManyToManyField('Size', related_name='products')
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="uploads/", blank=True, null=True)
    addedDate = models.DateField(auto_now_add=True)
    shipping = models.ForeignKey(Shipping, on_delete=models.CASCADE, related_name="products")
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
        if self.inventory >= int(quantity):
            self.inventory -= int(quantity)
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

class Cart(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)  # Uncomment when using authentication
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('product', )  # Uncomment when using authentication -> Agregar "user" cuando ya haya la funcionalidad de authentication.

    def __str__(self):
        return f"Cart: {self.product.name}"  # Adjust as needed

    
class PaymentMethod(models.Model):
    METHOD_CHOICES = [
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    # user = models.ForeignKey(User, on_delete=models.CASCADE)  # Uncomment when user auth is implemented
    method_type = models.CharField(max_length=20, choices=METHOD_CHOICES)
    details = models.JSONField()  # Store method-specific details as JSON

    def __str__(self):
        return f"{self.method_type} - {self.details}"

class Order(models.Model):
    order_number = models.PositiveIntegerField(unique=True)
    product_name = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order {self.order_number} - {self.product_name} - {self.total_amount}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            # Automatically assign an order number by counting the total number of orders + 1
            last_order = Order.objects.aggregate(count=Count('id'))
            self.order_number = last_order['count'] + 1
        super(Order, self).save(*args, **kwargs)