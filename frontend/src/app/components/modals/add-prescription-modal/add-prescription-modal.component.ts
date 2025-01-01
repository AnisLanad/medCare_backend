import { Component, OnInit } from '@angular/core';
import { AddPrescriptionModalService } from '../../../services/add-prescription-modal.service';
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
  selector: 'app-add-prescription-modal',
  imports: [CommonModule, ReactiveFormsModule, SignaturePadComponent],
  templateUrl: './add-prescription-modal.component.html',
  styleUrl: './add-prescription-modal.component.css',
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
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      nss: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      dateSigned: ['', [Validators.required]],
      treatments: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ]),
      ]),
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
  get treatments() {
    return this.prescriptionForm.get('treatments') as FormArray;
  }
  addTreatment() {
    const newTreatment = this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]);
    this.treatments.push(newTreatment);
  }
  removeTreatment(index: number) {
    this.treatments.removeAt(index);
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
