#Los imports de abajo son para las imagenes:
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils import timezone
from django.db.models import Count
from django.core.validators import MaxValueValidator
from django.core.exceptions import ValidationError

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
    GENDER_CHOICES = [
        ('Hombre', 'Hombre'),
        ('Mujer', 'Mujer'),
        ('Unisex', 'Unisex'),
    ]

    name = models.CharField(max_length=100)
    inventory = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(validators=[MaxValueValidator(10000000)])
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='Unisex')
    description = models.TextField(blank=True, null=True)
    isDiscounted = models.BooleanField(default=False)
    discountPrice = models.PositiveIntegerField(validators=[MaxValueValidator(10000000)], null=True)
    size = models.JSONField(
        models.FloatField(),
        blank=True, 
        default=list
    )
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    addedDate = models.DateField(auto_now_add=True)
    freeShipping = models.BooleanField(default=False)
    slug = models.SlugField()

    class Meta:
        ordering = ("-addedDate", )

    def __str__(self):
        return self.name
    
    #Asegurarse que el precio de descuento sea menor al precio original:
    def clean(self):
        super().clean()  # Call the base class clean
        if self.isDiscounted:
            if self.discountPrice > self.price:
                raise ValidationError({
                    'discountPrice': f'Discount price must be less than or equal to price ({self.price}).'
                })

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

    def validate_credit_card(self, card_number):
        # Luhn Algorithm for Credit Card Validation
        def digits_of(n):
            return [int(d) for d in str(n)]
        digits = digits_of(card_number)
        odd_digits = digits[-1::-2]
        even_digits = digits[-2::-2]
        checksum = sum(odd_digits)
        for d in even_digits:
            checksum += sum(digits_of(d * 2))
        return checksum % 10 == 0

    def clean(self):
        if self.method_type == 'credit_card':
            if not self.validate_credit_card(self.details.get('card_number')):
                raise ValidationError('Invalid Credit Card number')
        
        if self.method_type == 'paypal':
            email_regex = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'
            if not re.match(email_regex, self.details.get('paypal_email', '')):
                raise ValidationError('Invalid PayPal email')

        if self.method_type == 'bank_transfer':
            iban = self.details.get('iban', '')
            if len(iban) < 15:  # Adjust IBAN length rules as necessary
                raise ValidationError('Invalid IBAN')

    def __str__(self):
        return f"{self.method_type} - {self.details}"

class Order(models.Model):
    order_number = models.PositiveIntegerField(unique=True)
    product_name = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_option = models.CharField(max_length=10)
    date = models.DateTimeField(default=timezone.now)
    bank_transfer_status = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.order_number} - {self.product_name} - {self.total_amount}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            # Automatically assign an order number by counting the total number of orders + 1
            last_order = Order.objects.aggregate(count=Count('id'))
            self.order_number = last_order['count'] + 1
        super(Order, self).save(*args, **kwargs)