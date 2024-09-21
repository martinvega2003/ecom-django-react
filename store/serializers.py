#Los serializers sirven para obtener la info de la BD y convertirla a JSON para pasarla al frontend.

from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer() #Asi traemos toda la data de la FK aca.
    class Meta:
        model = Product
        fields = ["name", "inventory", "price", "category", "description", "image", "thumbnail", "addedDate", "slug"]
        
