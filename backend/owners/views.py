from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Owner
from .serializers import OwnerSerializer
from accounts.permissions import IsAdminOrReceptionist

class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReceptionist]