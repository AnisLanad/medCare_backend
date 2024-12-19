from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated ,AllowAny
from .models import Patient
from .serializers import PatientSerializer
# Create your views here.

class PatientProfileView(APIView):
    permission_classes = [AllowAny]  # L'utilisateur doit être authentifié

    def get(self, request):
        # Récupérer l'utilisateur connecté
        user_ID = request.query_params.get("id")  # Exemple : récupérer un email via les paramètres de la requête

        # Vérifier si cet utilisateur est lié à un médecin
        try:
            medecin = Patient.objects.get(DPI_ID=user_ID)
        except Patient.DoesNotExist:
            return Response({"error": "Medecin not found"}, status=404)

        # Sérialiser les données du médecin
        serializer = PatientSerializer(medecin)
        return Response(serializer.data)