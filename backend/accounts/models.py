from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('vet', 'Vétérinaire'),
        ('reception', 'Réceptionniste'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='reception')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
