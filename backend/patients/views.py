from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Patient, AntecedentPatient
from .serializers import PatientSerializer, PatientDetailSerializer, AntecedentPatientSerializer

class PatientViewSet(viewsets.ModelViewSet):  #viewset permet de definir les actions a effectuer sur les objets
    queryset = Patient.objects.all()   #had le viewset effectue ses actons sur tout les objets de la base de donné
    serializer_class = PatientSerializer    #c'est le serializer qui transforme les objets en forma JSON:API
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]  #Ces filtres te permettent d'ajouter des fonctionnalités de filtrage, de recherche et de tri dans les requêtes API
    filterset_fields = ['NSS', 'Mutuelle']  
    search_fields = ['Nom', 'Prenom', 'NSS', 'Telephone']
    ordering_fields = ['Nom', 'Prenom', 'DateNaissance', 'DateMaj']

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

class AntecedentPatientViewSet(viewsets.ModelViewSet):
    queryset = AntecedentPatient.objects.all()
    serializer_class = AntecedentPatientSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['Patient']
    ordering_fields = ['Date']