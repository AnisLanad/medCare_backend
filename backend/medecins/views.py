from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from patients.models import Patient
from datetime import date
from rest_framework import status

from rest_framework import status
from .serializers import RadioReportSerializer
from .models import RadioReport
from rest_framework.parsers import MultiPartParser, FormParser

from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Medecin, Infirmier, Laborantin, Consultation, Certificat,
    Medicament, Ordonnance, OrdonnanceMedicament, Soininfirmier,
    Bilan, Image , CustomUser,Pharmacist
)
from .serializers import (
    MedecinSerializer, InfirmierSerializer, LaborantinSerializer,
    ConsultationSerializer, ConsultationDetailSerializer, CertificatSerializer,
    MedicamentSerializer, OrdonnanceSerializer, OrdonnanceMedicamentSerializer,PharmacistSerializer,
    SoininfirmierSerializer, BilanSerializer, ImageSerializer , CustomTokenObtainPairSerializer , AllPatientSerializer
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

    @action(detail=True, methods=['get'])
    def by_patient(self, request, pk=None):
        """
        Custom action to get all ordonnances of a specific patient.
        The `pk` here is the ID of the patient.
        """
        try:
            patient = Patient.objects.get(pk=pk)  # Get the patient by primary key
            ordonnances = Ordonnance.objects.filter(Consultation__Patient=patient)  # Filter by patient
            serializer = self.get_serializer(ordonnances, many=True)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=404)
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
   
    @action(detail=False, methods=['get'])
    def by_patient(self, request):
        """
        Get ordonnances by patient ID
        """
        patient_id = request.query_params.get('patient_id')  # Get patient_id from query params
        if not patient_id:
            return Response({"detail": "Patient ID is required"}, status=status.HTTP_400_BAD_REQUEST)
       
        try:
            # Fetch the patient object
            
            patient = Patient.objects.get(DPI_ID=patient_id)


            # Get ordonnances related to this patient
            ordonnances = Ordonnance.objects.filter(Consultation__Patient=patient.DPI_ID)
            print(ordonnances)


            # Serialize the ordonnances
            serializer = OrdonnanceSerializer(ordonnances, many=True)


            # Return the serialized data
            return Response(serializer.data)


        except Patient.DoesNotExist:
            return Response({"detail": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

class OrdonnanceMedicamentViewSet(viewsets.ModelViewSet):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['Ordonnance', 'Medicament']

class SoininfirmierViewSet(viewsets.ModelViewSet):
    queryset = Soininfirmier.objects.all()
    serializer_class = SoininfirmierSerializer
    parser_classes = (MultiPartParser, FormParser) 
    def create(self, request, *args, **kwargs):
        print("Received Data:", request.data)  # Debugging
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Errors:", serializer.errors)  # Print validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

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
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer    
    
class GetNomPrenom(APIView):
    def get(self,request, username ,role): 
        if (role == "medecin" ):
            personne = Medecin.objects.get(Email = username)
        if ( role == "patient"):
            personne = Patient.objects.get(Email = username)
 
        return Response({"Nom" : personne.Nom ,"Prenom": personne.Prenom})
    

class GetPatients(APIView):
    def get(self, request , username):
         medecin = Medecin.objects.get(Email = username)
         patients = medecin.patients.all()
         serializer = AllPatientSerializer(patients, many=True)  # Sérialiser les patients

         return Response (serializer.data)

class GetNbCons (APIView):
    def get(self, request , username):
        medecin = Medecin.objects.get(Email = username)
        consultations = Consultation.objects.filter(
            Medecin_id = medecin.Medecin_ID,
            Datecons = date.today().strftime('%Y-%m-%d')
            )
        personne1 = Patient.objects.get(DPI_ID = consultations[1].Patient_id)
        personne2 = Patient.objects.get(DPI_ID = consultations[2].Patient_id)
        print(personne1 , personne2)
        
        return Response ( {          
                "count": consultations.count(),
                "patient1" : {personne1.Nom +" "+ personne1.Prenom}  , 
                "patient2" :{ personne2.Nom +" "+ personne2.Prenom} 
                         })




class RadioReportViewSet(viewsets.ModelViewSet):
    queryset = RadioReport.objects.all()  # Required for ViewSet
    serializer_class = RadioReportSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get_queryset(self):
        return RadioReport.objects.filter(patientID=12345)
    
from .models import LabReport
from .serializers import LabReportSerializer

class LabReportViewSet(viewsets.ModelViewSet):
    queryset = LabReport.objects.all()
    serializer_class = LabReportSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get_queryset(self):
        return LabReport.objects.filter(patientID=12345) 
    
class PharmacistViewSet(viewsets.ModelViewSet):
    queryset = Pharmacist.objects.all()  # Get all pharmacists from the database
    serializer_class = PharmacistSerializer  # Serializer class for Pharmacist
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['Name', 'Email']  # Allows searching by name or email
    ordering_fields = ['Name', 'Email']  # Allows ordering by name or email
    filterset_fields = ['Specialty']  # Filter pharmacists by their specialty

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        pharmacist = self.get_object()  # Retrieve the pharmacist object
        messages = pharmacist.messages.all()  # Get all messages associated with this pharmacist
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)