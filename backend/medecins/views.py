from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Medecin, Infirmier, Laborantin, Consultation, Certificat,
    Medicament, Ordonnance, OrdonnanceMedicament, Soininfirmier,
    Bilan, Image
)
from .serializers import (
    MedecinSerializer, InfirmierSerializer, LaborantinSerializer,
    ConsultationSerializer, ConsultationDetailSerializer, CertificatSerializer,
    MedicamentSerializer, OrdonnanceSerializer, OrdonnanceMedicamentSerializer,
    SoininfirmierSerializer, BilanSerializer, ImageSerializer
)

class MedecinViewSet(viewsets.ModelViewSet):
    queryset = Medecin.objects.all()   #c'est la requête qui permet de récupérer tous les medecins de la base de données 
    serializer_class = MedecinSerializer   #c'est la classe qui permet de sérialiser et de deseriliser les objets medcins
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter] #permet de filtrer, rechercher et trier les medecins
    filterset_fields = ['Specialite']      #permet de filtrer les medecin par sepécialité
    search_fields = ['Nom', 'Prenom', 'Email']  #permet de rechercher un medecin par nom, prenom ou email
    ordering_fields = ['Nom', 'Prenom']     #permet de trier les medecins par nom ou prenom

    @action(detail=True, methods=['get'])
    def consultations(self, request, pk=None): #permet de récupérer la liste de consultation associé a un medecin, pourquoi ?, parce que c'est une relation de clé étrangère, ca veut dire qu'un medecin peut avoir plusieurs consultations, donc on doit pouvoir récupérer les consultations associé a un medecin, c'est pour cela qu'on a crée cette action
        medecin = self.get_object() #on récupère le medecin
        consultations = medecin.consultations.all() #on récupère les consultations associé a ce medecin
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data)

class InfirmierViewSet(viewsets.ModelViewSet):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Nom', 'Prenom', 'Email']
    ordering_fields = ['Nom', 'Prenom']

class LaborantinViewSet(viewsets.ModelViewSet):
    queryset = Laborantin.objects.all()
    serializer_class = LaborantinSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Nom', 'Prenom', 'Email']
    ordering_fields = ['Nom', 'Prenom']

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['Medecin', 'Patient', 'Datecons']
    search_fields = ['Motif', 'Diagnostic']
    ordering_fields = ['Datecons']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ConsultationDetailSerializer
        return ConsultationSerializer

class CertificatViewSet(viewsets.ModelViewSet):
    queryset = Certificat.objects.all()
    serializer_class = CertificatSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['Consultation', 'Datecert']
    ordering_fields = ['Datecert']

class MedicamentViewSet(viewsets.ModelViewSet):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['Forme']
    search_fields = ['Nom', 'Fabricant']

class OrdonnanceViewSet(viewsets.ModelViewSet):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['Consultation']

    @action(detail=True, methods=['get'])
    def medicaments(self, request, pk=None):
        ordonnance = self.get_object()
        ordonnance_medicaments = ordonnance.ordonnance_medicaments.all()
        serializer = OrdonnanceMedicamentSerializer(ordonnance_medicaments, many=True)
        return Response(serializer.data)

class OrdonnanceMedicamentViewSet(viewsets.ModelViewSet):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['Ordonnance', 'Medicament']

class SoininfirmierViewSet(viewsets.ModelViewSet):
    queryset = Soininfirmier.objects.all()
    serializer_class = SoininfirmierSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['Infirmier', 'Patient', 'Date']
    ordering_fields = ['Date']

class BilanViewSet(viewsets.ModelViewSet):
    queryset = Bilan.objects.all()
    serializer_class = BilanSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['Medecin', 'Patient', 'Laborantin', 'Date']
    ordering_fields = ['Date']

    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        bilan = self.get_object()
        images = bilan.image.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['Bilan']