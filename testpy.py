import requests

# Liste des endpoints à tester
BASE_URL = "http://127.0.0.1:8000/api/"
endpoints = [
    "medecins/",
    "infirmiers/",
    "laborantins/",
    "patients/",
    "antecedents/",
    "consultations/", 
    "certificats/",
    "ordonnances/",
    "medicaments/",
    "ordonnance-medicaments/",
    "soins-infirmiers/",
    "bilans/",
    "images/",
    "radio_report/",
]

# Tester chaque endpoint
for endpoint in endpoints:
    url = BASE_URL + endpoint
    print(f"Testing endpoint: {url}")
    try:
        # Faire une requête GET
        response = requests.get(url)
        
        # Afficher le résultat
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Response JSON:", response.json())
        else:
            print("Error Message:", response.text)
    except Exception as e:
        print(f"An error occurred while testing {url}: {e}")
    print("-" * 50)
