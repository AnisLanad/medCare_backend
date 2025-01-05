from django.db import models
from patients.models import Patient
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model


class Medecin(models.Model):
    class SpecialiteChoices(models.TextChoices):
        CARDIOLOGIE = 'CARD', 'Cardiologie'
        PEDIATRIE = 'PED', 'Pédiatrie'
        ORTHOPEDIE = 'ORTH', 'Orthopédie'
        DERMATOLOGIE = 'DERM', 'Dermatologie'
        GENERALISTE = 'GEN', 'Médecin généraliste'

    Medecin_ID = models.AutoField(primary_key=True)
    Nom = models.CharField(max_length=100)
    Prenom = models.CharField(max_length=100)
    Specialite = models.CharField(
        max_length=5,
        choices=SpecialiteChoices.choices,
        default=SpecialiteChoices.GENERALISTE
    )
    Telephone = models.CharField(max_length=15)
    Email = models.EmailField()
    MotDePasse = models.CharField(max_length=100)
    patients = models.ManyToManyField(Patient, related_name='medecins')  
    #cela signfie qu'un medecin peut avoir plusieurs patients, et un patient peut avoir plusieurs medecins, et 2eme dis quon peut acceder a la liste des medecins d"un patient en utilsant patient.medecins

    
    
    def __str__(self):
        return f"Dr. {self.Nom} {self.Prenom} - {self.get_Specialite_display()}"


class Infirmier(models.Model):
    Nom = models.TextField()
    Prenom = models.TextField()
    Telephone = models.TextField(max_length=15)
    Email = models.EmailField()
    
    def __str__(self):
        return f"Infirmier {self.Nom} {self.Prenom} "
    
class Laborantin(models.Model):
    Nom = models.TextField()
    Prenom = models.TextField()
    Telephone = models.TextField(max_length=15)
    Email = models.EmailField()    
    def __str__(self):
        return f"Laborantin {self.Nom} {self.Prenom} "

class Consultation(models.Model):
    Consultation_ID = models.AutoField(primary_key=True)
    Patient = models.ForeignKey(
        Patient, 
        on_delete=models.CASCADE, 
        related_name="consultations"
    )
    PatientSymptoms = models.TextField(default="No symptoms reported")  # Default text for patient symptoms
    measure = models.TextField(default="N/A")  # Default text for measurement name
    measureValue = models.FloatField(default=0.0)  # Default measurement value
    diagnosticEstablished = models.BooleanField(default=False)  # Default diagnostic status
    patientHistory = models.TextField(default="No previous history")  # Default text for patient history
    Datecons = models.DateField(auto_now=True)  # Automatically set to the current date
    nextConsultation = models.DateField(null=True, blank=True)  # Can be set later, no default
    Medecin = models.ForeignKey(
        Medecin, 
        on_delete=models.CASCADE, 
        related_name="consultations"
    )
    Motif = models.TextField(default="General consultation")  # Default consultation reason
    diagnostic = models.TextField(default="Pending")  # Default diagnostic result

    def __str__(self):
       return f"Consultation faite par Dr {self.Medecin} pour {self.Patient}"






class Certificat(models.Model):
     Consultation = models.ForeignKey(Consultation , on_delete=models.CASCADE , related_name="certificats")
     Datecert = models.DateField(blank=True)
     Description = models.TextField()
     
     def save(self, *args, **kwargs):
        if not self.Datecert:  # Ne pas écraser si déjà défini
            self.Datecert = self.Consultation.Datecons  # Copier la date de la consultation
        super().save(*args, **kwargs)  # Appel à la méthode `save` parente
        
     def __str__(self):
       return f"Certificat fait par Dr{self.Consultation.Medecin} pour{self.Consultation.Patient} "
   
class Medicament(models.Model):
    Nom = models.TextField()
    Dosage = models.TextField()
    Fabricant = models.TextField()
    Forme = models.CharField(max_length=100, choices=[
        ('comprimé', 'Comprimé'),
        ('sirop', 'Sirop'),
        ('capsule', 'Capsule'),
        ('pommade', 'Pommade'),
        ('autre', 'Autre'),
    ], default='autre')    
    
    def __str__(self):
       return f"{self.Nom} sous forme de {self.Forme} "
   

class Ordonnance(models.Model):
     Consultation = models.ForeignKey(Consultation , on_delete=models.CASCADE , related_name="ordonnances")
     Medicaments = models.ManyToManyField(Medicament, through='OrdonnanceMedicament', related_name="ordonnances")
     Description = models.TextField()
     Date = models.DateField(auto_now=True)
     Valid = models.BooleanField(default=False)
     

     def __str__(self):
        return f"Ordonnance #{self.id} pour {self.Consultation.Patient} par Dr. {self.Consultation.Medecin}"
          

class OrdonnanceMedicament(models.Model):
        Ordonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE, related_name="ordonnance_medicaments")
        Medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE, related_name="ordonnance_medicaments")
        Posologie = models.CharField(max_length=200)  # Exemple : "2 fois par jour pendant 7 jours"

        def __str__(self):
          return f"{self.Medicament.Nom} ({self.Posologie}) pour l'ordonnance #{self.Ordonnance.id}"
      
  
class Soininfirmier(models.Model):
        Infirmier =  models.ForeignKey(Infirmier, on_delete=models.CASCADE, related_name="soininfirmier")
        Patient  =   models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="soininfirmier")
        Date = models.DateField(auto_now=True)
        Description = models.TextField()
        def __str__(self):
          return f"{self.Infirmier.Nom} pour {self.Patient.Nom}"        
     
class Bilan(models.Model):
    Medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE, related_name="bilan")
    RadiologistName = models.TextField(null=True, blank=True)
    Laborantin = models.ForeignKey(Laborantin, on_delete=models.CASCADE, related_name="bilan_laborantin", null=True, blank=True)
    Patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="bilan")
    Rapport = models.TextField(null=True,blank=True)
    Date = models.DateField(auto_now=True)
    Type = models.TextField()
    Informations = models.TextField()


    def __str__(self):
        return f"Bilan par Dr {self.Medecin.Nom} pour {self.Patient.Nom}"




class Image(models.Model):
        Titre = models.TextField()
        Image = models.TextField()
        Bilan = models.ForeignKey(Bilan, on_delete=models.CASCADE, related_name="image") 
        
        def __str__(self):
          return f"{self.Titre} "
      

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('medecin', 'Medecin'),
        ('patient', 'Patient'),
    ]
    
    # Ajouter un champ 'role' pour différencier les utilisateurs
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    

    # Remplacer 'username' par 'email' pour l'authentification
    REQUIRED_FIELDS = [ 'role' ]  # Le champ 'role' sera requis lors de la création
    
    groups = models.ManyToManyField(
        'auth.Group', related_name='customuser_groups', blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='customuser_permissions', blank=True
    )
    def __str__(self):
        return f"{self.email} ({self.role})"
    
@receiver(post_save, sender=Medecin)
def create_user_for_medecin(sender, instance, created, **kwargs):
    if created:  
        user = CustomUser(
            username=instance.Email,
            role='medecin'
        )
        user.set_password(instance.MotDePasse)
        user.save()
        
@receiver(post_save, sender=Patient)
def create_user_for_medecin(sender, instance, created, **kwargs):
    if created:  
        user = CustomUser(
            username=instance.Email,
            role='patient'
        )
        user.set_password(instance.Telephone)
        user.save()
        