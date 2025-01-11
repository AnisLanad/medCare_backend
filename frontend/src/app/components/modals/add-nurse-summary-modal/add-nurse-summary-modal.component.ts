import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NurseDetailsModalService } from '../../../services/add-nurse-summary-modal.service';
import { fadeInOut } from '../../../animations/animations';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddPrescriptionModalService } from '../../../services/add-prescription-modal.service';

@Component({
  selector: 'app-add-nurse-summary-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-nurse-summary-modal.component.html',
  styleUrl: './add-nurse-summary-modal.component.css',
  animations: [fadeInOut],
})
export class AddSummaryModalComponent {
  isOpen = false;
  constructor(
    private addSummaryModalService: NurseDetailsModalService,
    private fb: FormBuilder,
    private addPrescriptionModalService: AddPrescriptionModalService
  ) {
    this.summaryForm = this.fb.group({
      medications: ['', [Validators.required, Validators.minLength(5)]],
      observation: ['', [Validators.required, Validators.minLength(5)]],
      summary: ['', [Validators.required, Validators.minLength(1)]],
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
  }
  closeModal() {
    this.addSummaryModalService.closeModal();
  }

  onSubmit() {
    if (this.summaryForm.valid) {
      console.log('Form submitted:', this.summaryForm.value);
    }
  }
  summaryOptions: string[] = ['Summary 1', 'Summary 2', 'Summary 3', 'Summary 4'];

}
