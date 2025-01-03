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
      <div class="header-row">
        <div class="header-cell id">ID</div>
        <div class="header-cell name">Name</div>
        <div class="header-cell">Doctor</div>
        <div class="header-cell">Date</div>
        <div class="header-cell">Disease</div>
        <div class="header-cell">NSS</div>
        <div class="header-cell actions">Actions</div>
      </div>
      <app-patient-row
        *ngFor="let patient of patients"
        [patient]="patient"
        (onEdit)="handleEdit($event)"
        (onDelete)="handleDelete($event)"
      ></app-patient-row>
    </div>
  `,
  styles: [`
    .patient-list {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
    }

    .header-row {
      display: grid;
      grid-template-columns: 60px 120px 1fr 1fr 1fr 1fr 100px;
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

    app-patient-row .row-container {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #212529;
      line-height: 24px;
    }
  `]
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    // Subscribe to the patients observable
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
        // Here you could add error handling, like showing a notification
      }
    });
  }

  handleEdit(patient: Patient): void {
    this.patientService.updatePatient(patient).subscribe({
      next: (updatedPatient) => {
        console.log('Patient updated successfully:', updatedPatient);
        // this.showSuccessMessage('Patient mis à jour avec succès');
      },
      error: (error) => {
        if (error.message.includes('Version conflict')) {
          console.warn('Conflict detected:', error);
          // this.showWarningMessage('Les données ont changé. La page va être rafraîchie avec les dernières données.');
          setTimeout(() => {
            // Recharger le composant ou rafraîchir les données
            this.loadCurrentData();
          }, 2000); // Délai pour que l'utilisateur puisse lire le message
        } else {
          console.error('Error updating patient:', error);
          // this.showErrorMessage('Erreur lors de la mise à jour du patient');
        }
      }
    });
}

private loadCurrentData() {
    // Méthode pour recharger les données actuelles
    // À implémenter selon votre logique d'application
}
  handleDelete(id: number): void {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        console.log('Patient deleted successfully');
        // Optional: Add success message or notification
      },
      error: (error) => {
        console.error('Error deleting patient:', error);
        // Here you could add error handling, like showing an error message
      }
    });
  }
}
