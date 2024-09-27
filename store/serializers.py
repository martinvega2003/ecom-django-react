#Los serializers sirven para obtener la info de la BD y convertirla a JSON para pasarla al frontend.

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Category, Cart, PaymentMethod

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

class CategoryData(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductData(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category = CategoryData() #Asi traemos toda la data de la FK aca.
    class Meta:
        model = Product
        fields = ["id", "name", "inventory", "price", "category", "description", "isDiscounted", "image", "thumbnail", "addedDate", "slug"]
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "products"] #Le agregamos "products" para que en un array nos traiga los productos de esta categoria

class CartSerializer(serializers.ModelSerializer):
    product = ProductData()
    class Meta:
        model = Cart
        fields = ['id', 'product']  # Adjust fields as needed

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'method_type', 'details']