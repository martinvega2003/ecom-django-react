#Los serializers sirven para obtener la info de la BD y convertirla a JSON para pasarla al frontend.

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Category, Cart, PaymentMethod, Order

class CategoryData(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductData(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category = CategoryData() #Asi traemos toda la data como un objeto de la FK aca.
    class Meta:
        model = Product
        fields = ["id", "name", "inventory", "price", "gender", "category", "description", "isDiscounted", "discountPrice", "size", "image", "addedDate", "freeShipping", "slug"]
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "products"] #Le agregamos "products" para que en un array nos traiga los productos de esta categoria

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Cart
        fields = ['id', 'product']  

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'method_type', 'details']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_number', 'product_name', 'total_amount', 'date']