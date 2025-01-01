from rest_framework import viewsets, filters
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from medecins.models import (Medecin,Infirmier,Laborantin)
from medecins.serializers import (MedecinSerializer,ConsultationSerializer,InfirmierSerializer,LaborantinSerializer)
from patients.models import (Patient)
from patients.serializers import (PatientSerializer,PatientDetailSerializer,AntecedentPatientSerializer)

class MedecinViewSet(viewsets.ModelViewSet):
    queryset = Medecin.objects.all()   # Query to fetch all Medecins
    serializer_class = MedecinSerializer   # Serializer for Medecins
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]  # Filtering, searching, and ordering
    filterset_fields = ['Specialite']      # Filter by Specialite
    search_fields = ['Nom', 'Prenom', 'Email']  # Search by Nom, Prenom, or Email
    ordering_fields = ['Nom', 'Prenom']     # Order by Nom or Prenom
    permission_classes = [IsAdminUser]  # Allow only admin users to access this viewset

    @action(detail=True, methods=['get'])
    def consultations(self, request, pk=None):
        """
        Custom action to retrieve all consultations associated with a medecin.
        """
        medecin = self.get_object()  # Get the Medecin object
        consultations = medecin.consultations.all()  # Retrieve all consultations related to the Medecin
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data)    #permet de trier les medecins par nom ou prenom


class PatientViewSet(viewsets.ModelViewSet):  #viewset permet de definir les actions a effectuer sur les objets
    queryset = Patient.objects.all()   #had le viewset effectue ses actons sur tout les objets de la base de donné
    serializer_class = PatientSerializer    #c'est le serializer qui transforme les objets en forma JSON:API
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]  #Ces filtres te permettent d'ajouter des fonctionnalités de filtrage, de recherche et de tri dans les requêtes API
    filterset_fields = ['Mutuelle']
    search_fields = ['Nom', 'Prenom', 'NSS', 'Telephone']
    ordering_fields = ['Nom', 'Prenom', 'DateNaissance', 'DateMaj']
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):  #Cette méthode permet de choisir dynamiquement quel serializer utiliser en fonction de l'action effectuée sur le Patient.
        if self.action == 'retrieve':   #si l'action est retrieve, donc on veut recuperer un seul objet, on utilise le serializer PatientDetailSerializer
            return PatientDetailSerializer
        return PatientSerializer  #sinon on utilise le serializer PatientSerializer, qui est utilisé pour les listes d'objets

    @action(detail=True)  #ici tu ajoute une actions, lorsque tu veux recuprer les entecedent d'un patient specifique 
    def antecedents(self, request, pk=None):
        patient = self.get_object()   #djib le patient
        antecedents = patient.antecedentpatient.all()   #djib ces antecedents
        serializer = AntecedentPatientSerializer(antecedents, many=True)   #tu serialise les antecedents
        return Response(serializer.data)     #tu retourne les antecedents
    
    @action(detail=True)
    def medecins_traitants(self, request, pk=None):
        patient = self.get_object()
        medecins = patient.medecins.all()
        return Response([{
            'id': med.Medecin_ID,
            'nom': f"Dr. {med.Nom} {med.Prenom}",
            'specialite': med.get_Specialite_display(),
            'telephone': med.Telephone
        } for med in medecins]) 
    

class InfirmierViewSet(viewsets.ModelViewSet):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Nom', 'Prenom', 'Email']
    ordering_fields = ['Nom', 'Prenom']
    permission_classes = [IsAdminUser]

class LaborantinViewSet(viewsets.ModelViewSet):
    queryset = Laborantin.objects.all()
    serializer_class = LaborantinSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Nom', 'Prenom', 'Email']
    ordering_fields = ['Nom', 'Prenom']
    permission_classes = [IsAdminUser]

class AllHealthcareWorkersViewSet(ViewSet):
    permission_classes = [IsAdminUser]

    def list(self, request):
        # Retrieve all objects from each model
        medecins = Medecin.objects.all()
        infirmiers = Infirmier.objects.all()
        laborantins = Laborantin.objects.all()

        # Serialize the data
        medecins_serializer = MedecinSerializer(medecins, many=True)
        infirmiers_serializer = InfirmierSerializer(infirmiers, many=True)
        laborantins_serializer = LaborantinSerializer(laborantins, many=True)

        # Combine the data into a single response
        data = {
            "medecins": medecins_serializer.data,
            "infirmiers": infirmiers_serializer.data,
            "laborantins": laborantins_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)