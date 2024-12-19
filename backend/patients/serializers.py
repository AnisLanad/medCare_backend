from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Patient
        fields = ['DPI_ID', 'Nom', 'Prenom', 'DateNaissance', 'Telephone', 'Adresse','NSS','Mutuelle','NumPerCont','DateMaj','MotDePasse' ,]
