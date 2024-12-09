from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import FeeStructureViewSet, FeeStructureComponentViewSet

router = DefaultRouter()
router.register(r'feeStructure', FeeStructureViewSet)
router.register(r'feeStructureComponent', FeeStructureComponentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

router = routers.DefaultRouter()