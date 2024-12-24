"""medCare_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from medecins import views as medecins_views
from patients import views as patiens_views


# Création du router pour l'API
router = DefaultRouter()

# Routes pour les professionnels de santé
router.register(r'medecins', medecins_views.MedecinViewSet)
router.register(r'infirmiers', medecins_views.InfirmierViewSet)
router.register(r'laborantins', medecins_views.LaborantinViewSet)

# Routes pour les patients et leurs données
router.register(r'patients', patiens_views.PatientViewSet)
router.register(r'antecedents', patiens_views.AntecedentPatientViewSet)

# Routes pour les consultations et documents associés
router.register(r'consultations', medecins_views.ConsultationViewSet)
router.register(r'certificats', medecins_views.CertificatViewSet)
router.register(r'ordonnances', medecins_views.OrdonnanceViewSet)

# Routes pour les médicaments
router.register(r'medicaments', medecins_views.MedicamentViewSet)
router.register(r'ordonnance-medicaments', medecins_views.OrdonnanceMedicamentViewSet)

# Routes pour les soins et bilans
router.register(r'soins-infirmiers', medecins_views.SoininfirmierViewSet)
router.register(r'bilans', medecins_views.BilanViewSet)
router.register(r'images', medecins_views.ImageViewSet)

urlpatterns = [
    # URL d'administration Django
    path('admin/', admin.site.urls),
    
    # URLs de l'API
    path('api/', include(router.urls)),
    
    # URLs d'authentification de l'API
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]