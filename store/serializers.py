#Los serializers sirven para obtener la info de la BD y convertirla a JSON para pasarla al frontend.

from rest_framework import serializers
from .models import Product, Category

class CategoryData(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category = CategoryData() #Asi traemos toda la data de la FK aca.
    class Meta:
        model = Product
        fields = ["name", "inventory", "price", "category", "description", "isDiscounted", "image", "thumbnail", "addedDate", "slug"]
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "products"] #Le agregamos "products" para que en un array nos traiga los productos de esta categoria