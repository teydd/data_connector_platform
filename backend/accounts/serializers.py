from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    #User model
    class Meta:
        model = User
        fields = ['username', 'email','role','id','date_joined','last_login', 'is_active','first_name', 'last_name']
        read_only_fields = ['id', 'date_joined', 'last_login']

class RegisterSerializer(serializers.ModelSerializer):
    #Creating a user
    password = serializers.CharField(write_only=True, min_length = 8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm', 'role', 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password']!= attrs['password_confirm']:
            raise serializers.ValidationError({"password":"Passwords do not match"})
        return attrs   

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user