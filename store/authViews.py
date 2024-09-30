# Create your views here.

#Importes para el User y autenticacion:
from django.contrib.auth import authenticate #Metodo para comprobar si el usuario existe en la BD.
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication

#Importes para la funcion de busqueda:
from rest_framework.decorators import api_view #Decorador 

#Creamos las vistas con viewsets usanfo los serializers:
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    user = get_object_or_404(User, username=request.data["username"]) #Obtenemos el usuario o hay un error 404

    if not user.check_password(request.data["password"]): #check_password sirve para ver si la contraseña es valida:
        return Response({"error": "Contraseña invalida"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user) #Obtiene o crea el token en donde el campo user sea igual a la variable user de esta funcion
    serializer = UserSerializer(instance=user) #el serializer es basicamente los datos de user en formato JSON
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data) #Verifica la data que envio el cliente (El JSON)

    if serializer.is_valid(): #Verifica que la data enviada por el cliente sea valida:
        user = serializer.save() # Now the password is hashed inside the serializer #En caso de ser valida, se guarda.

        #user = User.objects.get(username=serializer.data["username"]) #Se obtiene el usuario cuyo username sea igual al username del diccionario que se guardo en serializer.data
        #user.set_password(serializer.data["password"]) #Metodo set para establecer la contraseña
        #user.save() #Se guarda en la BD

        token = Token.objects.create(user=user) #Se crea un token con los datos de user y se guarda en la variableer = 
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED) #token.key tiene el token y en user se guarda el diccionario que se encuentra en serializer.data
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #En caso de que los datos enviados no sean validos.

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
#Los decoradores de arriba sirven para que a los datos de esta vista solo se puedan acceder con un token de usuario
def profile(request):
    if isinstance(request.user, AnonymousUser):
        return Response({"error": "Not authenticated."}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(instance=request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def logout(request):
    try:
        request.user.auth_token.delete()  # Delete the user's token
        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
    except (AttributeError, Token.DoesNotExist):
        return Response({"error": "Logout failed."}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            # Add other fields as needed
        }
        return Response(user_data)

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() #Se guarda el usuario en la BD
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username') #Obtenemos el username del objeto que nos pasa el cliente
        password = request.data.get('password') #Obtenemos la password del objeto que nos pasa el cliente.
        user = authenticate(username=username, password=password) #Usamos la funcion authenticate para comprobar si el user existe en la BD y guardamos lo que retorna en una variable.
        if user is not None:
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)