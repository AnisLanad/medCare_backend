from django.contrib import admin
from .models import Patient, AntecedentPatient

class AntecedentPatientInline(admin.TabularInline):
    model = AntecedentPatient
    extra = 1
    
@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('Nom', 'Prenom', 'NSS', 'Mutuelle', 'Telephone', 'DateNaissance', 'DateMaj')
    list_filter = ('Mutuelle', 'DateMaj')
    search_fields = ('Nom', 'Prenom', 'NSS', 'Telephone')
    date_hierarchy = 'DateNaissance'
    inlines = [AntecedentPatientInline]
    readonly_fields = ('DateMaj',)
    fieldsets = (
        ('Informations personnelles', {
            'fields': ('Nom', 'Prenom', 'DateNaissance', 'Adresse', 'Telephone')
        }),
        ('Informations administratives', {
            'fields': ('NSS', 'Mutuelle', 'NumPerCont', 'MotDePasse')
        }),
        ('Suivi', {
            'fields': ('DateMaj',)
        })
    )

@admin.register(AntecedentPatient)
class AntecedentPatientAdmin(admin.ModelAdmin):
    list_display = ('Patient', 'Date', 'Antecedent')
    list_filter = ('Date',)
    search_fields = ('Patient__Nom', 'Antecedent')
    date_hierarchy = 'Date'