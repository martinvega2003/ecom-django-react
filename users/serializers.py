from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True} #La contraseña solo se puede escribir, pero no se vera en la BD (Se guarda como un token).
        }

    def create(self, validData): #Funcion para crear un usuario.
        password = validData.pop("password", None)
        instance = self.Meta.model(**validData)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance