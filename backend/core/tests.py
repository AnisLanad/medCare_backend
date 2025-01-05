from django.test import TestCase
from django.test import TransactionTestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from datetime import date
from medecins.models import (
    Medecin, Consultation, Certificat,
    Ordonnance, Medicament, Bilan, Infirmier,
    Laborantin,
)

from patients.models import (
    Patient, AntecedentPatient,
)


class MedecinTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.medecin = Medecin.objects.create(
            Nom="Dupont",
            Prenom="Jean",
            Specialite="CARD",
            Telephone="0123456789",
            Email="dupont@example.com",
            MotDePasse="password123"
        )
        self.medecin_url = reverse('medecin-list')
        self.medecin_detail_url = reverse('medecin-detail', kwargs={'pk': self.medecin.Medecin_ID})

    def test_create_medecin(self):
        data = {
            "Nom": "lllllllllll",
            "Prenom": "Paul",
            "Specialite": "PED",
            "Telephone": "0987654321",
            "Email": "martin@example.com",
            "MotDePasse": "secure123"
        }
        response = self.client.post(self.medecin_url, data, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Medecin.objects.count(), 2)

    def test_get_medecins(self):
        response = self.client.get(self.medecin_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class PatientTests(TransactionTestCase):    #
    def setUp(self):
        self.client = APIClient()  #initialise un client api, le client api permet d'envoyer des requete http
        self.patient = Patient(
            Nom="Dubooooooo",
            Prenom="Marie",
            DateNaissance=date(1990, 1, 1),
            Adresse="123 rue de Paris",
            Telephone="0123456789",
            NSS="123456789",
            Mutuelle="CNAS",
            NumPerCont="0987654321",
            MotDePasse="password123"
        )
        self.patient_url = reverse('patient-list')   #elle genere had l'url /api/patients/ li tedi vers la vue patient-list, 
        self.patient_detail_url = reverse('patient-detail', kwargs={'pk': self.patient.DPI_ID})  #/api/patients/34/
        #donc la fonction reverse genere automatiquemnt une url a partir du nom de la vue, et des parametre qu'elle prend, l3ks tae routing, qui determine quel vu doit etre executé pour un url donné, et le routing est definie dans le fichier urls.py
        

    def test_create_patient(self):
        data = {
            "data": {   #c'est un diconnaire de donné, qui suit le format JSON:API
                "type": "Patient",
                "attributes": {
                    "Nom": "biskriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
                    "Prenom": "wassim",
                    "DateNaissance": "1985-06-15",
                    "Adresse": "123d rue de Paris",
                    "Telephone": "0123456789",
                    "NSS": "9876d54321",
                    "Mutuelle": "CNAS",
                    "NumPerCont": "0987654321",
                    "MotDePasse": "passdword123"
                }
            }
        }
        response = self.client.post(self.patient_url, data, format='vnd.api+json')  #hna rak tched le client api, et tu envoie avec une rquuete post, tu specifie fiha l'url, les donné que tu vas stocke, et leurs format qui est JSON:API
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)     #hna rak tchof la reponse de la requete api post b le parametre reponse.status_code, ida kan = HTTP_201_CREATED, donc la requete a ete bien effectue
       

    def test_get_all_patient(self):
        response = self.client.get(self.patient_url, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
   

class ConsultationTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.medecin = Medecin.objects.create(
            Nom="Dupont",
            Prenom="Jean",
            Specialite="CARD",
            Telephone="0123456789",
            Email="dupont@example.com",
            MotDePasse="password123"
        )
        self.patient = Patient.objects.create(
            Nom="Dubois",
            Prenom="Marie",
            DateNaissance=date(1990, 1, 1),
            Adresse="123 rue de Paris",
            Telephone="0123456789",
            NSS="123456789",
            Mutuelle="CNAS",
            NumPerCont="0987654321",
            MotDePasse="password123"
        )
        self.consultation = Consultation.objects.create(
            Patient=self.patient,
            Medecin=self.medecin,
            Motif="Consultation de routine",
            Diagnostic="RAS"
        )
        self.consultation_url = reverse('consultation-list')

    def test_create_consultation(self):
        data = {
            "Patient": self.patient.DPI_ID,
            "Medecin": self.medecin.Medecin_ID,
            "Motif": "Nouvelle consultation",
            "Diagnostic": "À suivre"
        }
        response = self.client.post(self.consultation_url, data, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class OrdonnanceTests(APITestCase):
    def setUp(self):
        # Créer les objets nécessaires pour les tests
        self.medecin = Medecin.objects.create(
            Nom="Dupont", Prenom="Jean", Specialite="CARD",
            Telephone="0123456789", Email="dupont@example.com",
            MotDePasse="password123"
        )
        self.patient = Patient.objects.create(
            Nom="Dubois", Prenom="Marie",
            DateNaissance=date(1990, 1, 1),
            Adresse="123 rue de Paris",
            Telephone="0123456789", NSS="123456789",
            Mutuelle="CNAS", NumPerCont="0987654321",
            MotDePasse="password123"
        )
        self.consultation = Consultation.objects.create(
            Patient=self.patient,
            Medecin=self.medecin,
            Motif="Consultation",
            Diagnostic="RAS"
        )
        self.medicament = Medicament.objects.create(
            Nom="Doliprane",
            Dosage="1000mg",
            Fabricant="Sanofi",
            Forme="comprimé"
        )
        self.ordonnance = Ordonnance.objects.create(
            Consultation=self.consultation,
            Description="Traitement standard"
        )

    def test_create_ordonnance(self):
        data = {
            "Consultation": self.consultation.Consultation_ID,
            "Description": "Nouvelle ordonnance",
            "Medicaments": [self.medicament.id]
        }
        response = self.client.post(reverse('ordonnance-list'), data, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class BilanTests(APITestCase):
    def setUp(self):
        self.medecin = Medecin.objects.create(
            Nom="Dupont", Prenom="Jean", Specialite="CARD",
            Email="dupont@example.com", MotDePasse="password123"
        )
        self.patient = Patient.objects.create(
            Nom="Dubois", Prenom="Marie",
            DateNaissance=date(1990, 1, 1),
            NSS="123456789", Mutuelle="CNAS",
            MotDePasse="password123"
        )
        self.laborantin = Laborantin.objects.create(
            Nom="Tech", Prenom="Lab",
            Telephone="0123456789", Email="lab@example.com"
        )

    def test_create_bilan(self):
        data = {
            "Medecin": self.medecin.Medecin_ID,
            "Patient": self.patient.DPI_ID,
            "Laborantin": self.laborantin.id,
            "Rapport": "Bilan sanguin normal"
        }
        response = self.client.post(reverse('bilan-list'), data, format='vnd.api+json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)