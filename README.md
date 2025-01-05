# medCare_backend
# medCare_backend

## Project Description

`medCare_backend` is a backend project for a medical care application built with Django and MySQL. It provides functionalities for managing patient records, medical consultations, prescriptions, and other healthcare-related data. The backend exposes RESTful APIs using Django REST Framework (DRF) for communication with frontend applications.

## Features

- User authentication with different roles (patient, doctor, administrator).
- Patient record management (DPI, consultations, prescriptions, etc.).
- Doctor functionalities to manage consultations and prescriptions.
- Admin interface for managing users, roles, and settings.

## Technologies Used

- **Django**: Python web framework for building the backend.
- **Django REST Framework**: To expose APIs.
- **MySQL**: Database management system.
- **Python Decouple**: For managing environment variables securely.

## Installation Instructions

### Prerequisites

Before setting up the project, ensure that you have the following installed:

- Python 3.x
- MySQL server
- pip (Python package installer)
- Git (for version control)

### Setting Up the Project

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/medCare_backend.git
   cd medCare_backend

2. **create and activate virtual environement**
    in the folder cloned run this 
    **python -m venv venv** to create venv
    **venv\Scripts\activate** to run the venv

3. **Install Dependencies**
    Once the virtual environment is activated, install the required dependencies from the requirements.txt run this
    **pip install -r backend/requirements.txt**


4. **Set Up MySQL Database**
    1. Log in to MySQL: **mysql -u root -p**
    2. create the database: **CREATE DATABASE medCare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;**
    3. configure database setting in setting.py
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'medCare_db',  # Your database name
                'USER': 'medCare_user',  # Your MySQL username
                'PASSWORD': 'password',  # Your MySQL password
                'HOST': 'localhost',
                'PORT': '3306',
            }
        }


5. **Set Up Environment Variables** 
    Create a .env file in the root directory of the project and add your sensitive configuration, such as the database password and secret keys.
    Make sure to add the .env file to .gitignore so it is not tracked by Git.
    DB_NAME=medCare_db
    DB_USER=root
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3306
    export SECRET_KEY='une_cle_secrete'


6. **Migrate the Database**
    **python manage.py makemigrations**
    **python manage.py migrate**






**brouillant**

class ConsultationSerializer(serializers.ModelSerializer):
    Medecin = MedecinSerializer(read_only=True)  # Sérialisation du médecin lié
    Patient = PatientSerializer(read_only=True)  # Sérialisation du patient lié (notez que ce champ doit être un seul patient, pas plusieurs)

    class Meta:
        model = Consultation
        fields = ['Consultation_ID', 'Patient', 'Medecin', 'Motif', 'Diagnostic']

Anis021538784888 password superuser


