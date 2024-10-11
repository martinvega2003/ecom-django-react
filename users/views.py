from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view #Decorador 

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None: #Si no se encuentra un usuario
            raise AuthenticationFailed("Usuario no encontrado")
        
        if not user.check_password(password): #Si no se envia la contraseña correcta
            raise AuthenticationFailed("Contraseña incorrecta")
        
        payload = { #Creamos el payload para el token
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60), #La sesion expira 60minutos despues de iniciarla
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, "secret", algorithm="HS256").decode("utf-8") #Creamos el token para la sesion

        #Para enviar el token via Cookies:
        response = Response()

        response.set_cookie(key="jwt", value=token, httponly=True) #Establecemos la Cookie (httponly significa que solo sera para enviarla al Backend y que este la use)
        response.data = {
            "jwt": token
        }
        
        return response
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt") #Del request buscamos en COOKIES en lugar de data para obtener el token

        if not token:
            raise AuthenticationFailed("Sin autenticacion")
        
        try:
            payload = jwt.decode(token, "secret", algorithms="HS256") #En payload guardamos el id del usuario (El mismo objeto que definimos en la vista del login)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Sin autenticacion")
        
        user = User.objects.filter(id=payload["id"]).first() #Obtenemos el usuario segun su ID
        serializer = UserSerializer(user) #Serializamos el usuario para poder enviar sus datos en formato JSON

        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message": "success"
        }
        return response