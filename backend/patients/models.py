from django.db import models
from owners.models import Owner

class Patient(models.Model):
    ANIMAL_TYPES = [
        ('CAT', 'Chat'),
        ('DOG', 'Chien'),
        ('RABBIT', 'Lapin'),
    ]
    name = models.CharField(max_length=100)
    animal_type = models.CharField(max_length=10, choices=ANIMAL_TYPES)
    breed = models.CharField(max_length=100)
    birth_date = models.DateField()
    weight = models.FloatField()
    sex = models.CharField(max_length=10)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name