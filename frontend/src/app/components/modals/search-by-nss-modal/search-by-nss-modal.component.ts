import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchByNssModalService } from '../../../services/search-by-nss-modal.service';
import { fadeInOut } from '../../../animations/animations';
import { SearchByNssService } from '../../../services/searchByNss/search-by-nss.service';
import { Perform } from '../../../utils/Perform';
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { Tpatient } from '../../../types/patient.type';
import { PatientModalService } from '../../../services/patient-modal.service';
import { SummaryService } from '../../../services/summaryService/summary.service';
import { AssessmentService } from '../../../services/AssessmentService/assessment.service';
import { PrescriptionService } from '../../../services/Prescription/prescription.service';
import { Tsummary } from '@app/types/summary.type';
import { Tassessment } from '@app/types/assessment.type';
import { Tprescription } from '@app/types/prescription.type';

@Component({
  selector: 'app-search-by-nss-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-by-nss-modal.component.html',
  styleUrl: './search-by-nss-modal.component.css',
  animations: [fadeInOut],
})
export class SearchByNssModalComponent implements OnInit {
  isOpen = false;
  searchForm: FormGroup;
  constructor(
    private searchByNssModalService: SearchByNssModalService,
    private fb: FormBuilder,
    private searchByNssService: SearchByNssService,
    private searchedPatientService: SearchedPatientService,
    private patientModalService: PatientModalService,
    private summaryService: SummaryService,
    private assessmentService: AssessmentService,
    private prescriptionService: PrescriptionService
  ) {
    this.searchForm = this.fb.group({
      nss: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.searchByNssModalService.isSearchByNssModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
  closeModal() {
    this.searchByNssModalService.closeModal();
  }
  searchData = new Perform<any>();
  onSubmit() {
    if (this.searchForm.valid) {
      const nss = this.searchForm.get('nss')?.value;
      this.searchData.load(
        this.searchByNssService.searchByNss(nss),
        (data: Tpatient[]) => {
          if (data.length > 0) {
            this.searchedPatientService.setSearchedPatient(data[0]);
            this.summaryService
              .getPatientSummaries(data[0].DPI_ID)
              .subscribe((data) => {
                this.searchedPatientService.setPatientSummary(
                  data as Tsummary[]
                );
              });
            this.assessmentService
              .getPatientAssessments(data[0].DPI_ID)
              .subscribe((data) => {
                this.searchedPatientService.setPatientAssessments(
                  data as Tassessment[]
                );
              });
            this.prescriptionService
              .getPatientPrescriptions(data[0].DPI_ID)
              .subscribe((data) => {
                console.log(data);
                this.searchedPatientService.setPatientPrescriptions(
                  data as Tprescription[]
                );
              });
            this.patientModalService.openModal();
          } else {
            console.log('no patient found');
          }
        }
      );
    }
  }
}
