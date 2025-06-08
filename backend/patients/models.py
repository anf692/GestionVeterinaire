from django.db import models
from owners.models import Owner

class Patient(models.Model):
    ANIMAL_TYPES = [
        ('chat', 'Chat'),
        ('chien', 'Chien'),
        ('lapin', 'Lapin'),
    ]

    SEX_CHOICES = [
        ('M', 'Mâle'),
        ('F', 'Femelle'),
    ]

    nom = models.CharField(max_length=100)
    Type = models.CharField(max_length=10, choices=ANIMAL_TYPES)
    race = models.CharField(max_length=100)
    naissance = models.DateField()
    poids = models.FloatField()
    sexe = models.CharField(max_length=1, choices=SEX_CHOICES)
    proprietaire = models.ForeignKey(Owner, related_name='patients', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} ({self.type})"
