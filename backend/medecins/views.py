from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated ,AllowAny
from .models import Medecin , Consultation
from .serializers import MedecinSerializer , ConsultationSerializer 

class MedecinProfileView(APIView):
    permission_classes = [AllowAny]  # L'utilisateur doit être authentifié
    
    def get(self, request):
        # Récupérer l'utilisateur connecté
        user_ID = request.query_params.get("id")  # Exemple : récupérer un email via les paramètres de la requête
       
        # Vérifier si cet utilisateur est lié à un médecin
        try:
            medecin = Medecin.objects.get(Medecin_ID=user_ID)
        except Medecin.DoesNotExist:
            return Response({"error": "Medecin not found"}, status=404)
        
        patients_du_medecin = medecin.patients.all()

        # Afficher les patients
        
        serializer = MedecinSerializer(medecin)
        return Response(serializer.data)


class ConsultationCheckView(APIView):
    permission_classes = [AllowAny]  # L'utilisateur doit être authentifié
    
    def get(self, request):
        # Récupérer l'utilisateur connecté
        user_ID = request.query_params.get("id")  # Exemple : récupérer un email via les paramètres de la requête
       
        # Vérifier si cet utilisateur est lié à un médecin
        try:
            consultation = Consultation.objects.get(Consultation_ID=user_ID)
        except Consultation.DoesNotExist:
            return Response({"error": "consultation not found"}, status=404)
        
        
        # Sérialiser les données du médecin
        serializer = ConsultationSerializer(consultation)
        return Response(serializer.data)
    
       
