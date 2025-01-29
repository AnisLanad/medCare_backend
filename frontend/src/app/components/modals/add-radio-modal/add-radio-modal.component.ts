import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPrescriptionModalService } from '../../../services/add-radio-modal.service';
import { RadioReportService } from '../../../services/radio-report.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-add-radio-modal',
  templateUrl: './add-radio-modal.component.html',
  styleUrls: ['./add-radio-modal.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
})

export class AddPrescriptionModalComponent implements OnInit {
  isOpen: boolean = false;
  prescriptionForm: FormGroup;
  fileName: string | null = null;
  fileData: File | null = null; // To store the selected file

  constructor(
    private addPrescriptionModalService: AddPrescriptionModalService,
    private radioReportService: RadioReportService,
    private fb: FormBuilder
  ) {
    this.prescriptionForm = this.fb.group({
      observation: ['', [Validators.required, Validators.maxLength(1200)]],
      dateSigned: ['', [Validators.required]],
      radiologistID: ['', [Validators.required]], // Add radiologist ID
      patientID: ['', [Validators.required]], // Add patient ID
    });
  }
  private isModalOpen = new BehaviorSubject<boolean>(false);
  isAddPrescriptionModalOpen$ = this.isModalOpen.asObservable();

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
    this.addPrescriptionModalService.isAddPrescriptionModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
    this.prescriptionForm = this.fb.group({
      observation: ['', [Validators.required, Validators.maxLength(1200)]],
      dateSigned: ['', [Validators.required]],
      radiologistID: [10, [Validators.required]], // Add radiologist ID
      patientID: [20, [Validators.required]], // Add patient ID
    });
    // this.addPrescriptionModalService.isAddPrescriptionModalOpen$.subscribe(
    //   (isOpen) => {
    //     this.isOpen = isOpen;
    //   }
    // );
  }

  // closeModal() {
  //   this.addPrescriptionModalService.closeModal();
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.fileData = file; // Store the file for upload
      console.log('Selected file:', file);
    }
  }

  onSubmit() {
    if (this.prescriptionForm.valid && this.fileData) {
      const formData = new FormData();
      formData.append('description', this.prescriptionForm.value.observation);
      formData.append('date_signed', this.prescriptionForm.value.dateSigned);
      formData.append('radiologistID', this.prescriptionForm.value.radiologistID.toString());
      formData.append('patientID', this.prescriptionForm.value.patientID.toString());
      formData.append('image', this.fileData); // Attach the file
  
      this.radioReportService.saveReport(formData).subscribe({
        next: (response) => {
          console.log('✅ Report saved successfully:', response);
  
          // ✅ Reset the form
          this.prescriptionForm.reset();
          this.fileName = null;
          this.fileData = null;
  
          // ✅ Close the modal using the modal service
          this.addPrescriptionModalService.closeModal(); 
  
        },
        error: (error) => {
          console.error('❌ Error saving report:', error);
        },
      });
    } else {
      console.error('⚠️ Form is invalid or missing required fields.');
    }
  }
  
  
}



// export class AddPrescriptionModalComponent implements OnInit {
//   isOpen: boolean = false;
//   prescriptionForm: FormGroup;
//   signatureUrl: string = '';
//   constructor(
//     private addPrescriptionModalService: AddPrescriptionModalService,
//     private fb: FormBuilder
//   ) {
    
//     this.prescriptionForm = this.fb.group({
      
      
      
//       observation: ['', [Validators.required ,Validators.max(1200)]],
      
//       dateSigned: ['', [Validators.required]],
//     });
//   }
//   isSignaturePadOpen = false;
//   openSignaturePad() {
//     this.isSignaturePadOpen = true;
//   }
//   ngOnInit(): void {
//     this.addPrescriptionModalService.isAddPrescriptionModalOpen$.subscribe(
//       (isOpen) => {
//         this.isOpen = isOpen;
//       }
//     );
//   }
//   closeModal() {
//     this.addPrescriptionModalService.closeModal();
//   }

//   onSubmit() {
//     if (this.prescriptionForm.valid && this.signatureUrl) {
//       const data = {
//         ...this.prescriptionForm.value,
//         signatureUrl: this.signatureUrl,
//       };
//       console.log(data);
//     }
//   }
//   saveSignature(signatureUrl: string) {
//     this.signatureUrl = signatureUrl;
//     this.isSignaturePadOpen = false;
//   }
//   removeSignature() {
//     this.signatureUrl = '';
//   }
  
  

  
//     fileName: string | null = null;
  
//     onFileSelected(event: Event): void {
//       const input = event.target as HTMLInputElement;
  
//       if (input.files && input.files.length > 0) {
//         const file = input.files[0];
//         this.fileName = file.name; // Display the file name next to the button
//         console.log('Selected file:', file);
//       }
//     }
// }
