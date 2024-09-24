# Create your views here.

#Importes para la funcion de busqueda:
from django.db.models import Q
from rest_framework.decorators import api_view #Decorador 

#Creamos las vistas con viewsets usanfo los serializers:
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
from django.http import Http404

from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

#CRUDS SIMPLES DE PRODUCT Y CATEGORY:

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

#VIEWS PARA VER PRODUCTOS POR CATEGORIAS

class ProductsByCategoryView(APIView):
    """
    API View to retrieve products added in the last 2 days for a specific category.
    If there are more than 4 products, return the most recent 4.
    """

    def get(self, request, category_id):
        """
        GET method to handle the request and return products from the last 2 days.
        :param category_id: The ID of the category to filter by.
        """
        # Get the category or return a 404 error if not found
        category = get_object_or_404(Category, id=category_id)
        
        # Filter products by the category and check if they were added in the last 2 days. Se obtienen estos productos en un array
        products = Product.objects.filter(category=category).order_by('-addedDate')
        
        # Serialize the filtered products
        serializer = ProductSerializer(products, many=True)
        
        # Return the serialized data along with HTTP status 200 (OK)
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No products in this category"})

#VIEW PARA  OBTENER LOS PRODUCTOS AGREGADOS EN LOS ULTIMOS 2 DIAS (MAXIMO DE 4 PRODUCTOS) POR CATEGORIA:

class RecentProductsByCategoryView(APIView):
    """
    API View to retrieve products added in the last 2 days for a specific category.
    If there are more than 4 products, return the most recent 4.
    """

    def get(self, request, category_id):
        """
        GET method to handle the request and return products from the last 2 days.
        :param category_id: The ID of the category to filter by.
        """
        # Get the category or return a 404 error if not found
        category = get_object_or_404(Category, id=category_id)

        # Get the current time and calculate the time for 2 days ago
        two_days_ago = timezone.now() - timedelta(days=2)
        
        # Filter products by the category and check if they were added in the last 2 days. Se obtienen estos productos en un array
        products = Product.objects.filter(category=category, addedDate__gte=two_days_ago).order_by('-addedDate')
        
        # Limit to the last 4 products if more than 4 are found. El array es igual al mismo array pero hasta el 4to productos
        if len(products) > 4:
            products = products[:4]
        
        # Serialize the filtered products
        serializer = ProductSerializer(products, many=True)
        
        # Return the serialized data along with HTTP status 200 (OK)
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No products in this category"})
    
class ProductDetail(APIView):
    def get_object(self, category_slug, product_slug):
        try:
            return Product.objects.get(category__slug=category_slug, slug=product_slug) 
            #Como arriba filtramos a partir de Product, hay que usar category__slug para comparar el slug de category (La FK) y solo slug para comparar el de Producto (Ya que es como se llama el propio atributo en el modelo Product)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug) #Llamamos a la funcion get_object directamente desde aca.
        serializer = ProductSerializer(product) #A ProductSerializer le pasamos el objeto product
        return Response(serializer.data, status=status.HTTP_200_OK) #Retornamos con Response la data del serializer.

class CategoryView(APIView):
    #Esta es la misma vista para obtener un solo producto, pero para obtener una sola categoria.
    
    def get_object(self, category_slug):
        try:
            return Category.objects.get(slug=category_slug) 
        except Category.DoesNotExist:
            raise Http404
        
    def get(self, request, category_slug, format=None):
        category = self.get_object(category_slug) 
        serializer = CategorySerializer(category) 
        return Response(serializer.data, status=status.HTTP_200_OK) 
    
@api_view(["POST"]) #Solo acepta peticiones POST
def search(request):
    query = request.data.get("query", "") #De request.data obtenemos query o un String vacio

    if query: #Si existe la query (Busqueda del user)
        products = Product.objects.get(Q(name__icontains=query) | Q(description__icontains=query)) #products = Del modelo productos se buscan los objetos que en el nombre o descripcion tengan coincidencias con la query
        serializer = ProductSerializer(products, many=True) #Serializamos el array productos (QUe pueden ser muchos)
        return Response(serializer.data) #Respondemos con la data del array serializado
    else:
        return Response({"products": []}) #Si no existe la query, retornamos un objeto que tiene una llave products que es un array vacio
    
