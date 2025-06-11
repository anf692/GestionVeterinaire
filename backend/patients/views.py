from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Patient
from .serializers import PatientSerializer
from accounts.permissions import IsAdmin, IsReceptionist, IsVet, IsAdminOrReceptionist, IsAdminOrVet

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsAuthenticated(), IsAdminOrReceptionist()]
        elif self.action in ['update', 'partial_update']:
            # ADMIN + VET peuvent modifier, mais pas supprimer
            return [IsAuthenticated(), IsAdminOrVet()]
        elif self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]  # Tous les rôles peuvent voir
        return super().get_permissions()