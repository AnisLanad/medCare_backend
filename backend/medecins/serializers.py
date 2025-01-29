from rest_framework import serializers
from .models import (
    Medecin, Infirmier, Laborantin, Consultation, Certificat,
    Medicament, Ordonnance, OrdonnanceMedicament, Soininfirmier,
    Bilan, Image , CustomUser,Pharmacist
)
from patients.serializers import PatientSerializer  # Assure-toi que ce chemin est correct
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from patients.models import Patient

class MedecinSerializer(serializers.ModelSerializer):
    # Le champ Specialite sera automatiquement géré comme un champ choice
    # On ajoute un champ pour afficher la version lisible de la spécialité
    specialite_display = serializers.CharField(source='get_Specialite_display', read_only=True)
    
    class Meta:
        model = Medecin
        fields = [
            'Medecin_ID',
            'Nom',
            'Prenom',
            'Specialite',
            'specialite_display',
            'Telephone',
            'Email',
            'MotDePasse',
            'patients'
        ]
        extra_kwargs = {
            'MotDePasse': {'write_only': True},  # que la possibilité decrire le mot de passe, soit dans la creation du compte ou la mise a jour du mot de passe, pas de le lire
            'Medecin_ID': {'read_only': True}  #on ne peut pas changé lid
        }



class InfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infirmier
        fields = ['id', 'Nom', 'Prenom', 'Telephone', 'Email']

class LaborantinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laborantin
        fields = ['id', 'Nom', 'Prenom', 'Telephone', 'Email']

from rest_framework import serializers
from .models import Consultation

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = [
            "Consultation_ID",
            "Patient",
            "PatientSymptoms",
            "measure",
            "measureValue",
            "diagnosticEstablished",
            "patientHistory",
            "Datecons",
            "nextConsultation",
            "Medecin",
            "Motif",
            "diagnostic",
        ]


class CertificatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificat
        fields = ['id', 'Consultation', 'Datecert', 'Description']
        read_only_fields = ['Datecert']  # Car il est automatiquement défini dans save()

class MedicamentSerializer(serializers.ModelSerializer):
    forme_display = serializers.CharField(source='get_Forme_display', read_only=True)
    
    class Meta:
        model = Medicament
        fields = ['id', 'Nom', 'Dosage', 'Fabricant', 'Forme', 'forme_display']

class OrdonnanceMedicamentSerializer(serializers.ModelSerializer):
    medicament_details = MedicamentSerializer(source='Medicament', read_only=True)
    
    class Meta:
        model = OrdonnanceMedicament
        fields = ['id', 'Ordonnance', 'Medicament', 'medicament_details', 'Posologie']

class OrdonnanceSerializer(serializers.ModelSerializer):
    ordonnance_medicaments = OrdonnanceMedicamentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Ordonnance
        fields = ['id', 'Consultation', 'Medicaments', 'Description', 'ordonnance_medicaments','Patient']
    def get_Patient(self, obj):
        # Retrieve the Patient through the related Consultation model
        return {
            "id": obj.Consultation.Patient.id,
        }
class SoininfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soininfirmier
        fields = '__all__'
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'Titre', 'Image', 'Bilan']

class BilanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilan
        fields = [
            'id', 
            'Medecin',
            'RadiologistName',
            'Laborantin',
            'Patient',
            'Rapport',
            'Date',
            'Type',
            'Informations'
        ]

# Serializer imbriqué pour les consultations détaillées
class ConsultationDetailSerializer(ConsultationSerializer):
    certificats = CertificatSerializer(many=True, read_only=True)
    ordonnances = OrdonnanceSerializer(many=True, read_only=True)
    
    class Meta(ConsultationSerializer.Meta):
        fields = ConsultationSerializer.Meta.fields + ['certificats', 'ordonnances']


    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Vérifier si un utilisateur existe avec le `username` fourni
        username = attrs.get("username")
        if not CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError("Utilisateur introuvable.")

        # Appel au sérialiseur parent pour continuer la validation
        data = super().validate(attrs)
        
        # Ajouter des informations supplémentaires au token si nécessaire
        data['role'] = self.user.role
        data['username'] = self.user.username
        return 
    

class AllPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['DPI_ID', 'Nom', 'Prenom', 'DateNaissance', 'NSS']
        
from .models import RadioReport

class RadioReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioReport
        fields = '__all__'
        
from .models import LabReport

class LabReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabReport
        fields = '__all__'

class PharmacistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = ['id', 'Nom', 'Prenom', 'Telephone', 'Email']