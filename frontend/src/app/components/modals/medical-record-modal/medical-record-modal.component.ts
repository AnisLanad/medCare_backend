import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations/animations';
import { MedicalRecordModalService } from '../../../services/medical-record-modal.service';
import { Tpatient } from '@app/types/patient.type';
import { Tsummary } from '@app/types/summary.type';
import { Tassessment } from '@app/types/assessment.type';
import { Tprescription } from '@app/types/prescription.type';
import { RadioReportsComponent } from '../../displayRadios/radio-reports.component';
import { LabReportsComponent } from '../../lab-reports/lab-reports.component';

@Component({
  selector: 'app-medical-record-modal',
  imports: [CommonModule, RadioReportsComponent, LabReportsComponent],
  templateUrl: './medical-record-modal.component.html',
  styleUrl: './medical-record-modal.component.css',
  animations: [fadeInOut],
})
export class MedicalRecordModalComponent implements OnInit {
  @Input() patient: Tpatient | null = null;
  @Input() patientSummary: Tsummary[] = [];
  @Input() patientAssessments: Tassessment[] = [];
  @Input() patientPrescriptions: Tprescription[] = [];
  
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

  medicalHistory = ['Hypertension', 'Type 2 Diabetes', 'Appendectomy (2015)'];

  prescriptions = [
    { name: 'Metformin', dose: '500mg', duration: '30 days' },
    { name: 'Amlodipine', dose: '10mg', duration: '15 days' },
  ];
}
