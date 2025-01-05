import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { PatientModalComponent } from '../modals/patient-modal/patient-modal.component';
import { AddPrescriptionModalComponent } from '../modals/add-prescription-modal/add-prescription-modal.component';
import { AddAssessmentModalComponent } from '../modals/add-assessment-modal/add-assessment-modal.component';
import { AddSummaryModalComponent } from '../modals/add-summary-modal/add-summary-modal.component';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [
    SidebarComponent,
    RouterOutlet,
    DoctorNavbarComponent,
    PatientModalComponent,
    AddPrescriptionModalComponent,
    AddAssessmentModalComponent,
    AddSummaryModalComponent,
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css',
})
export class DoctorDashboardComponent {
  links = [
    {
      path: 'home',
      label: 'Home',
      icon: 'fa fa-home',
    },
    {
      path: 'patients',
      label: 'My Patients',
      icon: 'fa fa-users',
    },
    {
      path: 'settings',
      label: 'Settings',
      icon: 'fa fa-gear',
    },
  ];
}
