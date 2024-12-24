from rest_framework import serializers
from .models import (
    Medecin, Infirmier, Laborantin, Consultation, Certificat,
    Medicament, Ordonnance, OrdonnanceMedicament, Soininfirmier,
    Bilan, Image
)
from patients.serializers import PatientSerializer  # Assure-toi que ce chemin est correct


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

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['Consultation_ID', 'Patient', 'Medecin', 'Motif', 'Datecons', 'Diagnostic']

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
        fields = ['id', 'Consultation', 'Medicaments', 'Description', 'ordonnance_medicaments']

class SoininfirmierSerializer(serializers.ModelSerializer):
    infirmier_nom_complet = serializers.SerializerMethodField()
    patient_nom_complet = serializers.SerializerMethodField()

    class Meta:
        model = Soininfirmier
        fields = ['id', 'Infirmier', 'Patient', 'Date', 'Description', 
                 'infirmier_nom_complet', 'patient_nom_complet']

    def get_infirmier_nom_complet(self, obj):
        return f"{obj.Infirmier.Prenom} {obj.Infirmier.Nom}"

    def get_patient_nom_complet(self, obj):
        return f"{obj.Patient.Prenom} {obj.Patient.Nom}"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'Titre', 'Image', 'Bilan']

class BilanSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True, source='image')
    
    class Meta:
        model = Bilan
        fields = ['id', 'Medecin', 'Patient', 'Laborantin', 'Rapport', 'Date', 'images']

# Serializer imbriqué pour les consultations détaillées
class ConsultationDetailSerializer(ConsultationSerializer):
    certificats = CertificatSerializer(many=True, read_only=True)
    ordonnances = OrdonnanceSerializer(many=True, read_only=True)
    
    class Meta(ConsultationSerializer.Meta):
        fields = ConsultationSerializer.Meta.fields + ['certificats', 'ordonnances']


