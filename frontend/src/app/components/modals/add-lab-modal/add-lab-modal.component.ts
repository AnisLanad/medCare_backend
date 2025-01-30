import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPrescriptionModalService } from '../../../services/add-lab-modal.service';
import { LabReportService } from '../../../services/lab-report.service';  // Import the LabReportService
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-lab-modal',
  templateUrl: './add-lab-modal.component.html',
  styleUrls: ['./add-lab-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})

export class AddLabModalComponent implements OnInit {
  isOpen: boolean = false;
  labReportForm: FormGroup;

  constructor(
    private addPrescriptionModalService: AddPrescriptionModalService,
    private labReportService: LabReportService, // Inject LabReportService
    private fb: FormBuilder
  ) {
    this.labReportForm = this.fb.group({ 
      generate_graph: [false], 
      blood_pressure: ['', [Validators.maxLength(50)]],
      blood_sugar: ['', [Validators.maxLength(50)]],
      cholesterol: ['', [Validators.max(120)]],
      Na: ['', [Validators.maxLength(15)]],
      hemoglobine: ['', [Validators.maxLength(15)]],
      iron: ['', [Validators.maxLength(15)]],
      dateSigned: ['', [Validators.required]],
    });
  }

  private isModalOpen = new BehaviorSubject<boolean>(false);
  isAddLabModalOpen$ = this.isModalOpen.asObservable();

  openModal() {
    console.log('🔵 Opening modal...');
    this.isModalOpen.next(true);
  }

  closeModal() {
    console.log('🔴 Closing modal...');
    this.addPrescriptionModalService.closeModal();
  }

  getModalState(): boolean {
    return this.isModalOpen.getValue();
  }

  ngOnInit(): void {
    this.addPrescriptionModalService.patientID$.subscribe((patientID) => {
      if (patientID) {
        this.labReportForm.patchValue({ patientID: patientID.toString() });
      }
    });
    this.addPrescriptionModalService.isAddPrescriptionModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
    this.labReportForm = this.fb.group({
      generate_graph: [false],
      blood_pressure: ['', [Validators.maxLength(50)]],
      blood_sugar: ['', [Validators.maxLength(50)]],
      cholesterol: ['', [Validators.max(120)]],
      Na: ['', [Validators.maxLength(15)]],
      hemoglobine: ['', [Validators.maxLength(15)]],
      iron: ['', [Validators.maxLength(15)]],
      dateSigned: ['', [Validators.required]],
      
      patientID: [30, [Validators.required]],  
      labID: [40, [Validators.required]],     
    });
  }

  onSubmit() {
    if (this.labReportForm.valid) {
      const formData = new FormData();
      formData.append('blood_pressure', this.labReportForm.value.blood_pressure);
      formData.append('blood_sugar', this.labReportForm.value.blood_sugar);
      formData.append('cholesterol', this.labReportForm.value.cholesterol.toString());
      formData.append('Na', this.labReportForm.value.Na);
      formData.append('hemoglobine', this.labReportForm.value.hemoglobine);
      formData.append('iron', this.labReportForm.value.iron);
      formData.append('date_signed', this.labReportForm.value.dateSigned);
      formData.append('generate_graph', this.labReportForm.value.generate_graph.toString());
      formData.append('patientID', this.labReportForm.value.patientID.toString()); // Static patientID
      formData.append('labID', this.labReportForm.value.labID.toString()); // Static labID

      this.labReportService.saveReport(formData).subscribe({
        next: (response) => {
          console.log('✅ Lab Report saved successfully:', response);

          // ✅ Reset the form
          this.labReportForm.reset();

          // ✅ Close the modal
          this.addPrescriptionModalService.closeModal(); 
        },
        error: (error) => {
          console.error('❌ Error saving Lab Report:', error);
        },
      });
    } else {
      console.error('⚠️ Form is invalid or missing required fields.');
    }
  }
}
