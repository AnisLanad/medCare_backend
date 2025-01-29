import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
    title: 'medCare',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/doctor-dashboard/doctor-dashboard.component').then(
        (m) => m.DoctorDashboardComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./components/patients/patients.component').then(
            (m) => m.PatientsComponent
          ),
        title: 'My Patients',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./components/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        title: 'Settings', 
      },
      {
        path: 'nurse_patients',
        loadComponent: () =>
          import('./components/nurse_patients/patients.component').then(
            (m) => m.PatientsComponent
          ),
        title: 'My Patients',
      },
      {
        path: 'pharmacist',
        loadComponent: () =>
          import('./components/pharmacist/phar.component').then(
            (m) => m.PatientsComponent
          ),
        title: 'Pharmacist',
      },
      {
        path: 'lab',
        loadComponent: () =>
          import('./components/lab/lab.component').then(
            (m) => m.PatientsComponent
          ),
        title: 'Lab Technician',
      },
      {
        path: 'radio',
        loadComponent: () =>
          import('./components/radio/lab.component').then(
            (m) => m.PatientsComponent
          ),
        title: 'Radiologist',
      },
    ],
  },
  {
    path: 'patient',
    loadComponent: () =>
      import('./components/patient-dashboard/patient-dashboard.component').then(
        (m) => m.PatientDashboardComponent
      ),
  },
  
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/dashboard-home/dashbaord-home').then(
            (m) => m.DashboardHomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'patient',
        loadComponent: () =>
          import('./components/patient-dash/patient-dash.component').then(
            (m) => m.PatientComponent
          ),
        title: 'Patient',
      },
      {
        path: 'doctor',
        loadComponent: () =>
          import('./components/doctor/doctor.component').then(
            (m) => m.DoctorComponent
          ),
        title: 'Doctor',
      },
      {
        path: 'lab',
        loadComponent: () =>
          import('./components/lab/lab.component').then((m) => m.PatientsComponent),
        title: 'Lab',
      },
      {
        path: 'nurse',
        loadComponent: () =>
          import('./components/nurse/nurse.component').then(
            (m) => m.NurseComponent
          ),
        title: 'Nurse',
      },
      
    ],
  },
  // 404
  {
    path: '**',
    title: '404',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
