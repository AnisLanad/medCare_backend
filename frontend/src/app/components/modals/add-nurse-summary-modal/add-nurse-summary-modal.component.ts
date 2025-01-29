import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddNurseSummaryService } from '../../../services/add-nurse-summary.service';
import { NurseDetailsModalService } from '../../../services/add-nurse-summary-modal.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-nurse-summary-modal',
  templateUrl: './add-nurse-summary-modal.component.html',
  styleUrls: ['./add-nurse-summary-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddSummaryModalComponent implements OnInit {
  isOpen: boolean = false;
  summaryForm: FormGroup;

  constructor(
    private addSummaryModalService: NurseDetailsModalService,
    private addNurseSummaryService: AddNurseSummaryService,
    private fb: FormBuilder
  ) {
    this.summaryForm = this.fb.group({
      Description: ['', [Validators.required, Validators.minLength(5)]],
      Date: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.addSummaryModalService.isAddSummaryModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );

    this.summaryForm = this.fb.group({
      Description: ['', [Validators.required, Validators.minLength(5)]],
      Date: ['', [Validators.required]],
      PatientID: [30, [Validators.required]],  // Fixed patient ID
      InfirmierID: [1, [Validators.required]], // Fixed nurse ID (Adjust dynamically if needed)
    });
  }

  closeModal() {
    this.addSummaryModalService.closeModal();
  }

  onSubmit() {
    if (this.summaryForm.valid) {
      const formData = new FormData();
      formData.append('Description', this.summaryForm.value.Description);
      formData.append('Date', this.summaryForm.value.Date);
      formData.append('PatientID', this.summaryForm.value.PatientID.toString());
      formData.append('InfirmierID', this.summaryForm.value.InfirmierID.toString());


      this.addNurseSummaryService.saveSummary(formData).subscribe({
        next: (response) => {
          console.log('✅ Nurse Summary saved successfully:', response);
          this.summaryForm.reset();
          this.closeModal();
        },
        error: (error) => {
          console.error('❌ Error saving Nurse Summary:', error);
        },
      });
    } else {
      console.error('⚠️ Form is invalid or missing required fields.');
    }
  }
}
