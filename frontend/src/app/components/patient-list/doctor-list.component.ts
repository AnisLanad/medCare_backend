import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService, Doctor } from '../../services/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { DoctorRowComponent } from '../patient-row/doctor-row.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, DoctorRowComponent, HttpClientModule],
  template: `
    <div class="doctor-list">
      <div class="header-row">
        <div class="header-cell id">ID</div>
        <div class="header-cell name">Name</div>
        <div class="header-cell">Specialty</div>
        <div class="header-cell">Phone</div>
        <div class="header-cell">Email</div>
        <div class="header-cell">Patients</div>
        <div class="header-cell actions">Actions</div>
      </div>
      <app-doctor-row
        *ngFor="let doctor of doctors"
        [doctor]="doctor"
        (onEdit)="handleEdit($event)"
        (onDelete)="handleDelete($event)"
      ></app-doctor-row>
    </div>
  `,
  styles: [`
    .doctor-list {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
    }
    .header-row {
      display: grid;
      grid-template-columns: 60px 120px 1fr 1fr 1fr 100px 100px;
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
    app-doctor-row .row-container {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #212529;
      line-height: 24px;
    }
  `]
})
export class DoctorListComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  private doctorsSubscription: Subscription | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorsSubscription = this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        console.log('Received updated doctors list:', doctors);
        this.doctors = [...doctors]; // Create a new array reference
      },
      error: (error) => {
        console.error('Error in doctors subscription:', error);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.doctorsSubscription) {
      this.doctorsSubscription.unsubscribe();
    }
  }

  handleEdit(doctor: Doctor): void {
    if (!doctor || !doctor.id) {
      console.error('Invalid doctor data');
      return;
    }
  
    this.doctorService.updateDoctor(doctor).subscribe({
      next: (updatedDoctor) => {
        console.log('Doctor updated successfully:', updatedDoctor);
        // No need to call loadDoctors() here, as the BehaviorSubject will automatically update the UI
      },
      error: (error) => {
        console.error('Error updating doctor:', error);
      }
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        console.log('Received updated doctors list:', doctors);
        this.doctors = [...doctors];
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }
  
  handleDelete(id: number): void {
    if (!id) {
      console.error('Invalid doctor ID');
      return;
    }

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        console.log('Doctor deleted successfully');
        // No need to manually update the doctors array
        // The subscription will handle the update automatically
      },
      error: (error) => {
        console.error('Error deleting doctor:', error);
      }
    });
  }
}