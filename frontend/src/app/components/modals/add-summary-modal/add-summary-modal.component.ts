import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AddSummaryModalService } from '../../../services/add-summary-modal.service';
import { fadeInOut } from '../../../animations/animations';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddPrescriptionModalService } from '../../../services/add-prescription-modal.service';
import { Tpatient } from '../../../types/patient.type';
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { SummaryService } from '../../../services/summaryService/summary.service';

@Component({
  selector: 'app-add-summary-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-summary-modal.component.html',
  styleUrl: './add-summary-modal.component.css',
  animations: [fadeInOut],
})
export class AddSummaryModalComponent {
  isOpen = false;
  patient: Tpatient | null = null;
  constructor(
    private addSummaryModalService: AddSummaryModalService,
    private fb: FormBuilder,
    private addPrescriptionModalService: AddPrescriptionModalService,
    private summaryService: SummaryService,
    private searchedPatientService: SearchedPatientService
  ) {
    this.summaryForm = this.fb.group({
      PatientSymptoms: ['', [Validators.required, Validators.minLength(5)]],
      measure: ['', [Validators.required, Validators.minLength(2)]],
      measureValue: [0, [Validators.required, Validators.min(0)]],
      diagnosticEstablished: [false],
      patientHistory: ['', [Validators.required, Validators.minLength(5)]],
      nextConsultation: ['', [Validators.required]],
      diagnostic: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  addPrescription() {
    this.addPrescriptionModalService.openModal();
  }

  @ViewChild('measureOptionsDropdown') measureOptionsDropdown!: ElementRef;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      this.measureOptionsDropdown &&
      !this.measureOptionsDropdown.nativeElement.contains(event.target)
    ) {
      this.closeMeasureOptions();
    }
  }
  summaryForm: FormGroup;
  measureOptions = ['Blood Sugar', 'Blood Pressure'];
  isMeasureOptionsOpen = false;
  openMeasureOptions() {
    this.isMeasureOptionsOpen = true;
  }
  closeMeasureOptions() {
    this.isMeasureOptionsOpen = false;
  }
  setMeasure(measure: string) {
    this.summaryForm.get('measure')?.setValue(measure);
    this.closeMeasureOptions();
  }
  ngOnInit(): void {
    this.addSummaryModalService.isAddSummaryModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.searchedPatientService.SearchedPatient$.subscribe((patient) => {
      this.patient = patient;
    });
  }
  closeModal() {
    this.addSummaryModalService.closeModal();
  }

  onSubmit() {
    if (this.summaryForm.valid) {
      const data = {
        ...this.summaryForm.value,
        Patient: this.patient?.DPI_ID,
        Medecin: 2,
        Motif: 'General consultation',
      };
      console.log('Form submitted:', data);
      this.summaryService
        .addSummary(data)
        .subscribe((data) => console.log(data));
    }
  }
}
