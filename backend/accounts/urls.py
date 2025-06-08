from django.urls import path
from .views import LoginView, LogoutView, UserListCreateView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserListCreateView.as_view(), name='users-list-create'),
]