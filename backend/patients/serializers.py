from rest_framework import serializers
from .models import Patient, AntecedentPatient

class AntecedentPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = AntecedentPatient
        fields = ['id', 'Patient', 'Date', 'Antecedent']

class PatientSerializer(serializers.ModelSerializer):
    mutuelle_display = serializers.CharField(source='get_Mutuelle_display', read_only=True)
    age = serializers.SerializerMethodField()
    
    class Meta:
        model = Patient
        fields = [
            'DPI_ID', 'Nom', 'Prenom', 'DateNaissance', 
            'Adresse', 'Telephone', 'NSS', 'Mutuelle',
            'mutuelle_display', 'NumPerCont', 'DateMaj',
            'age'
        ]
        extra_kwargs = {
            'MotDePasse': {'write_only': True},
            'DateMaj': {'read_only': True}
        }

    def get_age(self, obj):
        from datetime import date
        today = date.today()
        return today.year - obj.DateNaissance.year - ((today.month, today.day) < (obj.DateNaissance.month, obj.DateNaissance.day))

class PatientDetailSerializer(PatientSerializer):
    antecedents = AntecedentPatientSerializer(many=True, source='antecedentpatient')
    medecins = serializers.SerializerMethodField()

    class Meta(PatientSerializer.Meta):
        fields = PatientSerializer.Meta.fields + ['antecedents', 'medecins']

    def get_medecins(self, obj):
        return [{'id': med.Medecin_ID, 'nom': f"Dr. {med.Nom} {med.Prenom}", 
                'specialite': med.get_Specialite_display()} 
                for med in obj.medecins.all()]