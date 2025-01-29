import { Component, OnInit } from '@angular/core';
import { MedicalRecordModalService } from '../../services/medical-record-modal.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MedicalRecordModalComponent } from '../modals/medical-record-modal/medical-record-modal.component';
import { SearchByNssService } from '@app/services/searchByNss/search-by-nss.service';
import { Tpatient } from '@app/types/patient.type';
import { SearchedPatientService } from '@app/services/SearchedPatient/searched-patient.service';
import { SummaryService } from '@app/services/summaryService/summary.service';
import { AssessmentService } from '@app/services/AssessmentService/assessment.service';
import { PrescriptionService } from '@app/services/Prescription/prescription.service';
import { Tsummary } from '@app/types/summary.type';
import { Tassessment } from '@app/types/assessment.type';
import { Tprescription } from '@app/types/prescription.type';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, MedicalRecordModalComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css',
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
          pointerEvents: 'none',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            pointerEvents: 'auto',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 0,
            transform: 'translateY(-10px)',
            pointerEvents: 'none',
          })
        ),
      ]),
    ]),
  ],
})
export class PatientDashboardComponent implements OnInit {
  patient: Tpatient | null = null;
  patientSummary: Tsummary[] = [];
  patientAssessment: Tassessment[] = [];
  patientPrescriptions: Tprescription[] = [];
  constructor(
    private medicalRecordModalService: MedicalRecordModalService,
    private searchByNssService: SearchByNssService,
    private searchedPatientService: SearchedPatientService,
    private summaryService: SummaryService,
    private assessmentService: AssessmentService,
    private prescriptionService: PrescriptionService
  ) {}
  openMedicalRecordModal() {
    this.medicalRecordModalService.openModal();
  }
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit(): void {
    this.searchByNssService
      .searchByNss('123456789012')
      .subscribe((data: Tpatient[]) => {
        if (data.length > 0) {
          this.patient = data[0];
          this.summaryService
            .getPatientSummaries(this.patient.DPI_ID)
            .subscribe((data) => {
              this.patientSummary = data as Tsummary[];
            });
          this.assessmentService
            .getPatientAssessments(this.patient.DPI_ID)
            .subscribe((data) => {
              this.patientAssessment = data as Tassessment[];
            });
          this.prescriptionService
            .getPatientPrescriptions(this.patient.DPI_ID)
            .subscribe((data) => {
              this.patientPrescriptions = data as Tprescription[];
            });
        } else {
          console.log('no patient found');
        }
      });
  }
}
