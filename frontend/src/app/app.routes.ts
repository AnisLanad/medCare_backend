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
    ],
  },
  {
    path: 'patient',
    loadComponent: () =>
      import('./components/patient-dashboard/patient-dashboard.component').then(
        (m) => m.PatientDashboardComponent
      ),
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
