import { Component, OnInit } from '@angular/core';
import { AddPrescriptionModalService } from '../../../services/add-radio-modal.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignaturePadComponent } from '../../signature-pad/signature-pad.component';
import { fadeInOut } from '../../../animations/animations';

@Component({
  selector: 'app-add-radio-modal',
  imports: [CommonModule, ReactiveFormsModule, SignaturePadComponent],
  templateUrl: './add-radio-modal.component.html',
  styleUrl: './add-radio-modal.component.css',
  animations: [fadeInOut],
})
export class AddPrescriptionModalComponent implements OnInit {
  isOpen: boolean = false;
  prescriptionForm: FormGroup;
  signatureUrl: string = '';
  constructor(
    private addPrescriptionModalService: AddPrescriptionModalService,
    private fb: FormBuilder
  ) {
    
    this.prescriptionForm = this.fb.group({
      
      
      
      observation: ['', [Validators.required ,Validators.max(1200)]],
      
      dateSigned: ['', [Validators.required]],
    });
  }
  isSignaturePadOpen = false;
  openSignaturePad() {
    this.isSignaturePadOpen = true;
  }
  ngOnInit(): void {
    this.addPrescriptionModalService.isAddPrescriptionModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
  }
  closeModal() {
    this.addPrescriptionModalService.closeModal();
  }

  onSubmit() {
    if (this.prescriptionForm.valid && this.signatureUrl) {
      const data = {
        ...this.prescriptionForm.value,
        signatureUrl: this.signatureUrl,
      };
      console.log(data);
    }
  }
  saveSignature(signatureUrl: string) {
    this.signatureUrl = signatureUrl;
    this.isSignaturePadOpen = false;
  }
  removeSignature() {
    this.signatureUrl = '';
  }
  
  

  
    fileName: string | null = null;
  
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
  
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.fileName = file.name; // Display the file name next to the button
        console.log('Selected file:', file);
      }
    }
}
