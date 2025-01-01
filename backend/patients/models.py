from django.db import models

# Create your models here.
class Patient(models.Model):
    
    class MutuelleChoices(models.TextChoices):
        CNAS = 'CNAS'
        MTPS = 'MTPS'
        MACE = 'MACE'
       
    
    DPI_ID = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=100)
    Prenom = models.CharField(max_length=100)
    MotDePasse = models.CharField(max_length=100)
    DateNaissance = models.DateField()
    Adresse = models.CharField(max_length=100)
    Telephone = models.CharField(max_length=15)
    NSS  = models.CharField(max_length=20)
    Email = models.EmailField(null=True)
    
    Mutuelle = models.CharField(
        max_length=5,
        choices=MutuelleChoices.choices,
        default=MutuelleChoices.CNAS
    )
    NumPerCont = models.CharField(max_length=15)
    DateMaj = models.DateField(auto_now=True)
    

    
    def __str__(self):
        return f" {self.Nom} {self.Prenom} - {self.NSS}"
    
    
class AntecedentPatient(models.Model):
        Patient  =   models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="antecedentpatient")
        Date = models.DateField()
        Antecedent = models.TextField()
    
        def __str__(self):
           return f" {self.Patient.Nom} a   - {self.Antecedent}"    