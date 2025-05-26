from django.db import models
from owners.models import Owner


class Patient(models.Model):
    ANIMAL_TYPES = [
        ('chat', 'Chat'),
        ('chien', 'Chien'),
        ('lapin', 'Lapin'),
    ]

    name = models.CharField(max_length=100)
    animal_type = models.CharField(max_length=10, choices=ANIMAL_TYPES)
    breed = models.CharField(max_length=100)
    birth_date = models.DateField()
    weight = models.FloatField()
    sex = models.CharField(max_length=10)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='patients')

    def __str__(self):
        return f"{self.name} ({self.animal_type})"
class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='consultations')
    date = models.DateField(auto_now_add=True)
    notes = models.TextField()
    prescription = models.TextField(blank=True)

    def __str__(self):
        return f"Consultation du {self.date} - {self.patient.name}"
    
