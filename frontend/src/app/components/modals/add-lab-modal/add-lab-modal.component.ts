import { Component, OnInit } from '@angular/core';
import { AddPrescriptionModalService } from '../../../services/add-lab-modal.service';
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
  selector: 'app-add-lab-modal',
  imports: [CommonModule, ReactiveFormsModule, SignaturePadComponent],
  templateUrl: './add-lab-modal.component.html',
  styleUrl: './add-lab-modal.component.css',
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
      generate_graph: [false],
      blood_pressure: ['', [Validators.maxLength(50)]],
      blood_sugar: ['', [Validators.maxLength(50)]],
      cholesterol: ['', [ Validators.max(120)]],
      Na: [
        '',
        [
          Validators.maxLength(15),
        ],
      ],
      hemoglobine: [
        '',
        [
          Validators.maxLength(15),
        ],
      ],
      iron: [
        '',
        [
          Validators.maxLength(15),
        ],
      ],
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
}
