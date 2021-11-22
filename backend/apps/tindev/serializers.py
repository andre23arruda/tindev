from rest_framework import serializers
from .models import Dev


class DevSerializer(serializers.ModelSerializer):
    '''Dev Serializer'''

    class Meta:
        model = Dev
        fields = '__all__'