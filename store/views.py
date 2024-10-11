# Create your views here.

#Importes para el User y autenticacion:
from rest_framework.permissions import IsAuthenticated

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

from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics
from rest_framework import viewsets
from .models import Product, Category, Cart, PaymentMethod, Order
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, PaymentMethodSerializer, OrderSerializer

#Imports para procesar los pagos:
import requests
from .paypal_config import paypalrestsdk
import paypalrestsdk
from paypalrestsdk import Payment


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
    Retorna todos los productos de una categoria
    """

    def get(self, request, category_id):
        """
        Metodo GET con param = id de la categoria
        """
        # Obtener categoria o retornar 404
        category = get_object_or_404(Category, id=category_id)
        
        # Filtrar productos por categoria. Se obtienen estos productos en un array
        products = Product.objects.filter(category=category).order_by('-addedDate')
        
        # Serializamos productos
        serializer = ProductSerializer(products, many=True)
        
        # Retornamos el array serializado y un status 200.
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No products in this category"})

#VIEW PARA  OBTENER LOS PRODUCTOS AGREGADOS EN LOS ULTIMOS 2 DIAS (MAXIMO DE 4 PRODUCTOS) POR CATEGORIA:

class RecentProductsByCategoryView(APIView):
    """
    Retorna los ultimos 4 productos agregados. Solo 4 si hay mas de  4.
    """

    def get(self, request, category_id):
        """
        Metodo GET con param = id de la categoria
        """
        # Obtenmos la categoria o error 404
        category = get_object_or_404(Category, id=category_id)

        # Obtenemos el tiempo actual y lo calculamos restando dos dias.
        two_days_ago = timezone.now() - timedelta(days=2)
        
        # Filtro de products, se controla que se hallan agregado en los ultimos 2 dias. Se obtienen estos productos en un array
        products = Product.objects.filter(category=category, addedDate__gte=two_days_ago).order_by('-addedDate')
        
        #  El array es igual al mismo array pero hasta el 4to producto
        if len(products) > 4:
            products = products[:4]
        
        # Serializa el array
        serializer = ProductSerializer(products, many=True)
        
        # Retorna el array serializado
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
    
class CartListView(generics.ListAPIView):

    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.all()  # Testeo sin uthentication

@api_view(['POST'])
def add_to_cart(request):
    product_id = request.data['product_id']  #de request.data se obtiene el objeto que el cliente paso al servidor, y de ahi usamos get para obtener el id del producto

    try:
        product = Product.objects.get(id=product_id)  # Obtenemos la instancia del producto encontrado
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=404)
    cart_item, created = Cart.objects.get_or_create(product=product) #get si ya existe, create si no y se guarda en la variable created 
    if created: #Si existe created, se guarda en el carrito, si no no.
        return Response({'message': 'Product added to cart.'}, status=201)
    else:
        return Response({'message': 'Product already in cart.'}, status=400)

@api_view(['DELETE'])
def delete_from_cart(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        cart_item = Cart.objects.get(product=product)

        cart_item.delete()

        return Response({'message': 'Product removed from cart.'}, status=200)
    except Cart.DoesNotExist:
        return Response({'error': 'Product not found in cart.'}, status=404)
    
#VISTAS PARA EL PROCESO DE PAGO:

class PaymentMethodViewSet(viewsets.ModelViewSet):

    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) #get_serializer para usar el metodo get y obtener de request.data lo que ell cliente envio al servidor
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

# La funcion comentada es una funcion para procesar los pagos realmente, aun falta completarla. Abajo hay una funcion que solo simula un pago,
"""   
@api_view(['POST'])
def process_payment(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    payment_method_id = request.data.get('payment_method_id')

    product = get_object_or_404(Product, id=product_id)
    payment_method = get_object_or_404(PaymentMethod, id=payment_method_id)

    pyg_price = int(product.price) * quantity

    try:
        response = requests.get('https://v6.exchangerate-api.com/v6/7bf9fe8c252ed9adee0ae732/latest/PYG')
        exchange_rates = response.json()
        usd_rate = exchange_rates['rates']['USD']

        amount_in_usd = round(float(pyg_price) / usd_rate, 2)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    if payment_method.method_type == 'credit_card':
        payment = Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "type": "visa", 
                        "number": payment_method.details['cardNumber'],
                        "expire_month": payment_method.details['expiry'].split('/')[0],
                        "expire_year": payment_method.details['expiry'].split('/')[1],
                        "cvv2": payment_method.details['cvv'],
                        "first_name": payment_method.details['cardHolder'].split()[0],
                        "last_name": payment_method.details['cardHolder'].split()[-1]
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": str(amount_in_usd),
                    "currency": "USD"
                },
                "description": f"Payment for {quantity} of {product.name}"
            }]
        })

        if payment.create():
            print("Payment created successfully")
            product.reduceStock(quantity)
            product.save()

            return JsonResponse({
                "message": "Payment successful",
                "paymentID": payment.id
            })
        else:
            print(payment.error)
            return JsonResponse({"error": "Payment creation failed"}, status=500)


    elif payment_method.method_type == 'paypal':
        try:
            paypal_order = paypalrestsdk.Order({
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": str(amount_in_usd)
                    }
                }]
            })

            if paypal_order.create():
                return JsonResponse({"paypalOrderID": paypal_order.id})
            else:
                return JsonResponse({"error": "PayPal order creation failed"}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


    elif payment_method.method_type == 'bank_transfer':

        order = Order.objects.create(
            product=product,
            quantity=quantity,
            payment_method=payment_method,
            total_price=pyg_price,
            bank_transfer_status=False
        )
        
        instructions = "Please transfer the amount to the following bank account:\n" \
                    "Bank Name: Example Bank\n" \
                    "Account Number: 1234567890\n" \
                    "Account Holder: Your Company Name\n" \
                    "Once the transfer is completed, please notify us."

        return JsonResponse({
            "message": "Bank Transfer initiated. Payment pending confirmation.",
            "instructions": instructions,
            "order_id": order.id  
        })

    product.reduceStock(quantity)
    product.save()

    return Response({'message': 'Payment successful'}, status=200)

"""

@api_view(['POST'])
def process_payment(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    payment_method_id = request.data.get('payment_method_id')

    product = get_object_or_404(Product, id=product_id)
    payment_method = get_object_or_404(PaymentMethod, id=payment_method_id)

    total_price = int(product.price) * quantity

    # Simulacion de pago

    product.reduceStock(quantity)  
    product.save()

    return Response({'message': 'Payment successful'}, status=200)

@api_view(['DELETE'])
def delete_payment_method(request, method_id):
    try:
        method = PaymentMethod.objects.get(id=method_id)

        method.delete()

        return Response({'message': 'Payment method deleted.'}, status=200)
    except:
        return Response({'error': 'Couldnt delete payment method.'}, status=404)
    
#VISTAS PARA EL MODELO ORDER:

@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
def create_order(request):
    product_id = request.data.get('product_id')
    total_amount = request.data.get('amount')
    shipping_option = request.data.get("shipping_option")

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    
    # Create the order
    order = Order.objects.create(
        product_name=product.name,
        total_amount=total_amount,
        shipping_option=shipping_option
    )

    return Response({
        "message": "Order created successfully",
        "order_number": order.order_number,
        "product_name": order.product_name,
        "total_amount": order.total_amount,
        "date": order.date
    }, status=201)