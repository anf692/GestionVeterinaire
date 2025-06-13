from rest_framework.permissions import BasePermission

def _get_role(user):
    if user and user.is_authenticated:
        role = getattr(user, 'role', None)
        if role:
            return role.lower()
    return None

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        role = _get_role(request.user)
        return role == 'admin'

class IsReceptionist(BasePermission):
    def has_permission(self, request, view):
        role = _get_role(request.user)
        return role == 'receptionist'

class IsVet(BasePermission):
    def has_permission(self, request, view):
        role = _get_role(request.user)
        return role == 'vet'

class IsAdminOrReceptionist(BasePermission):
    def has_permission(self, request, view):
        role = _get_role(request.user)
        return role in ['admin', 'receptionist']

class IsAdminOrVet(BasePermission):
    def has_permission(self, request, view):
        role = _get_role(request.user)
        return role in ['admin', 'vet']

class IsAuthenticatedReadOnly(BasePermission):
    def has_permission(self, request, view):
        authenticated = request.user.is_authenticated if request.user else False
        allowed = request.method in ['GET', 'HEAD', 'OPTIONS']
        return authenticated and allowed
