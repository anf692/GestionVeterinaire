from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission
from .models import Patient
from .serializers import PatientSerializer


class IsVeterinaire(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="veterinaire").exists()


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated, IsVeterinaire]
