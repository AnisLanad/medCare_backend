from django.contrib import admin
from .models import (
    Medecin, Infirmier, Laborantin, Consultation, Certificat,
    Medicament, Ordonnance, OrdonnanceMedicament, Soininfirmier,
    Bilan, Image
)

@admin.register(Medecin)
class MedecinAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Prenom', 'Specialite', 'Email', 'Telephone')
    list_filter = ('Specialite',)
    search_fields = ('Nom', 'Prenom', 'Email')
    ordering = ('Nom', 'Prenom')

@admin.register(Infirmier)
class InfirmierAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Prenom', 'Email', 'Telephone')
    search_fields = ('Nom', 'Prenom', 'Email')
    ordering = ('Nom', 'Prenom')

@admin.register(Laborantin)
class LaborantinAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Prenom', 'Email', 'Telephone')
    search_fields = ('Nom', 'Prenom', 'Email')
    ordering = ('Nom', 'Prenom')

class CertificatInline(admin.TabularInline):
    model = Certificat
    extra = 0

class OrdonnanceMedicamentInline(admin.TabularInline):
    model = OrdonnanceMedicament
    extra = 1

class OrdonnanceInline(admin.TabularInline):
    model = Ordonnance
    extra = 0

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('Consultation_ID', 'Patient', 'Medecin', 'Datecons', 'Motif')
    list_filter = ('Datecons', 'Medecin')
    search_fields = ('Patient__Nom', 'Medecin__Nom', 'Motif', 'Diagnostic')
    date_hierarchy = 'Datecons'
    inlines = [CertificatInline, OrdonnanceInline]

@admin.register(Certificat)
class CertificatAdmin(admin.ModelAdmin):
    list_display = ('id', 'Consultation', 'Datecert')
    list_filter = ('Datecert',)
    search_fields = ('Description', 'Consultation__Patient__Nom')
    date_hierarchy = 'Datecert'

@admin.register(Medicament)
class MedicamentAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Forme', 'Dosage', 'Fabricant')
    list_filter = ('Forme',)
    search_fields = ('Nom', 'Fabricant')
    ordering = ('Nom',)

@admin.register(Ordonnance)
class OrdonnanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'Consultation', 'get_patient', 'get_medecin')
    search_fields = ('Consultation__Patient__Nom', 'Description')
    inlines = [OrdonnanceMedicamentInline]

    def get_patient(self, obj):
        return obj.Consultation.Patient
    get_patient.short_description = 'Patient'
    
    def get_medecin(self, obj):
        return obj.Consultation.Medecin
    get_medecin.short_description = 'Médecin'

@admin.register(OrdonnanceMedicament)
class OrdonnanceMedicamentAdmin(admin.ModelAdmin):
    list_display = ('Ordonnance', 'Medicament', 'Posologie')
    list_filter = ('Medicament',)
    search_fields = ('Ordonnance__Consultation__Patient__Nom', 'Medicament__Nom')

@admin.register(Soininfirmier)
class SoininfirmierAdmin(admin.ModelAdmin):
    list_display = ('Infirmier', 'Patient', 'Date')
    list_filter = ('Date', 'Infirmier')
    search_fields = ('Patient__Nom', 'Description')
    date_hierarchy = 'Date'

class ImageInline(admin.TabularInline):
    model = Image
    extra = 1

@admin.register(Bilan)
class BilanAdmin(admin.ModelAdmin):
    list_display = ('id', 'Medecin', 'Patient', 'Laborantin', 'Date')
    list_filter = ('Date', 'Medecin', 'Laborantin')
    search_fields = ('Patient__Nom', 'Rapport')
    date_hierarchy = 'Date'
    inlines = [ImageInline]

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('Titre', 'Bilan')
    search_fields = ('Titre', 'Bilan__Patient__Nom')
# Register your models here.
from .models import RadioReport

@admin.register(RadioReport)
class RadioReportAdmin(admin.ModelAdmin):
    list_display = ('radiologistID', 'patientID', 'date_signed', 'signature_url')  # Customize fields shown
    search_fields = ('radiologistID', 'patientID')
    
from .models import LabReport

@admin.register(LabReport)
class LabReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'labID', 'patientID', 'date_signed', 'generate_graph')
    search_fields = ('patientID', 'labID')
    list_filter = ('date_signed', 'generate_graph')
    
from .models import Pharmacist
@admin.register(Pharmacist)
class PharmacistAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Prenom', 'Email', 'Telephone')
    search_fields = ('Nom', 'Prenom', 'Email')
    ordering = ('Nom', 'Prenom')