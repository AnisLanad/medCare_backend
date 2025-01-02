import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './components/patient-list/patient-list.component'; // Ensure path is correct
import { SearchHeaderComponent } from './components/Header-dashboard/SearchHeader.component'; // Ensure path is correct
import {DashboardHeaderComponent} from './components/Header-dashboard/header.component';
import {SidebarComponent} from './components/left-bar/left-bar.component';
import {TestResultsComponent} from './components/stats/stats.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, PatientListComponent, SearchHeaderComponent, DashboardHeaderComponent, SidebarComponent, TestResultsComponent]
})
export class AppComponent {
  patients = [
    { id: 1, name: { first: 'John', last: 'Doe' }, assignedDoctor: 'Dr. Smith', date: '2024-01-01', disease: 'Flu', nss: '12345', birthDate: '', phoneNumber: '', address: '' },
    { id: 2, name: { first: 'Jane', last: 'Doe' }, assignedDoctor: 'Dr. Lee', date: '2024-01-02', disease: 'Cold', nss: '67890', birthDate: '', phoneNumber: '', address: '' }
  ];
  chartData = [
    { label: 'Cholestérol', current: 200, previous: 300 },
    { label: 'Fer', current: 120 },
    { label: 'Hypertension', current: 180, previous: 150 },
  ];

}
