from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import OwnerViewSet

router = DefaultRouter()
router.register(r'', OwnerViewSet, basename='owner')

urlpatterns = router.urls