import { Component, OnInit } from '@angular/core';
import { MedicalRecordModalService } from '../../../services/medical-record-modal.service';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations/animations';

@Component({
  selector: 'app-medical-record-modal',
  imports: [CommonModule],
  templateUrl: './medical-record-modal.component.html',
  styleUrl: './medical-record-modal.component.css',
  animations: [fadeInOut],
})
export class MedicalRecordModalComponent implements OnInit {
  constructor(private medicalRecordModalService: MedicalRecordModalService) {}
  isOpen = false;
  ngOnInit(): void {
    this.medicalRecordModalService.isMedicalRecordModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
  }
  closeModal() {
    this.medicalRecordModalService.closeModal();
  }

  patient = {
    name: 'John Doe',
    socialSecurityNumber: '123-45-6789',
    dateOfBirth: '1990-01-01',
    address: '123 Main St, Springfield',
    phone: '+1-555-123-4567',
    insurance: 'HealthCare Plus',
    doctor: 'Dr. Emily Smith',
    contactPerson: 'Jane Doe (+1-555-987-6543)',
  };

  medicalHistory = ['Hypertension', 'Type 2 Diabetes', 'Appendectomy (2015)'];

  prescriptions = [
    { name: 'Metformin', dose: '500mg', duration: '30 days' },
    { name: 'Amlodipine', dose: '10mg', duration: '15 days' },
  ];

  testResults = [
    { type: 'Blood Test', result: 'Normal', date: '2024-12-20' },
    { type: 'X-Ray', result: 'No abnormalities', date: '2024-12-22' },
  ];

  consultationSummary =
    'Patient is responding well to the current medication. Advised to maintain a balanced diet and regular exercise.';
}
