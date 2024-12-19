from rest_framework import serializers
from .models import Medecin ,Consultation
from patients.serializers import PatientSerializer  # Assure-toi que ce chemin est correct


class MedecinSerializer(serializers.ModelSerializer):
    patients = PatientSerializer(many=True, read_only=True)

    class Meta:
        model = Medecin
        fields = ['Medecin_ID', 'Nom', 'Prenom', 'Specialite', 'Telephone', 'Email','MotDePasse','patients']


class ConsultationSerializer(serializers.ModelSerializer):
    Medecin = MedecinSerializer(read_only=True)  # Sérialisation du médecin lié
    Patient = PatientSerializer(read_only=True)  # Sérialisation du patient lié (notez que ce champ doit être un seul patient, pas plusieurs)

    class Meta:
        model = Consultation
        fields = ['Consultation_ID', 'Patient', 'Medecin', 'Motif', 'Diagnostic']


