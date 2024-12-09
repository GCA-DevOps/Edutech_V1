from rest_framework import serializers
from .models import FeeStructure,FeeStructureComponent

class FeeStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeStructure
        fields = '__all__'

class FeeStructureComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeStructureComponent
        fields = '__all__'