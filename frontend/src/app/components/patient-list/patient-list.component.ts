// patient-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRowComponent } from '../patient-row/patient-row.component';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../modals/patient.interface';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, PatientRowComponent, HttpClientModule],
  template: `
    <div class="patient-list">
      <!-- Header Row -->
      <div class="header-row">
        <div class="header-cell id">ID</div>
        <div class="header-cell name">Name</div>
        <div class="header-cell">Birth Date</div>
        <div class="header-cell">Insurance</div>
        <div class="header-cell">NSS</div>
        <div class="header-cell actions">Actions</div>
      </div>

      <!-- Patient Rows -->
      <app-patient-row
        *ngFor="let patient of patients"
        [patient]="patient"
        (onEdit)="handleEdit($event)"
        (onDelete)="handleDelete($event)"
      ></app-patient-row>
    </div>
  `,
  styles: [
    `
      .patient-list {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-family: 'Poppins', sans-serif;
      }

      .header-row {
        display: grid;
        grid-template-columns: 60px 120px 1fr 1fr 1fr 100px;
        gap: 16px;
        padding: 12px;
        background-color: #f8f9fa;
        border-bottom: 2px solid #e9ecef;
        font-weight: 600;
        color: #212529;
        font-size: 14px;
        line-height: 23.8px;
      }

      .header-cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 600;
        color: #212529;
        line-height: 24px;
      }

      .actions {
        text-align: center;
      }
    `,
  ],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      },
    });
  }

  handleEdit(patient: Patient): void {
    this.patientService.updatePatient(patient).subscribe({
      next: (updatedPatient) => {
        console.log('Patient updated successfully:', updatedPatient);
      },
      error: (error) => {
        console.error('Error updating patient:', error);
      },
    });
  }

  handleDelete(id: number): void {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        console.log('Patient deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting patient:', error);
      },
    });
  }
}
