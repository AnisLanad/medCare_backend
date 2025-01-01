import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddAssessmentModalService } from '../../../services/add-assessment-modal.service';
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
  selector: 'app-add-assessment-modal',
  imports: [CommonModule, ReactiveFormsModule, SignaturePadComponent],
  templateUrl: './add-assessment-modal.component.html',
  styleUrl: './add-assessment-modal.component.css',
  animations: [fadeInOut],
})
export class AddAssessmentModalComponent implements OnInit {
  isOpen: boolean = false;
  assessmentForm: FormGroup;
  signatureUrl: string = '';
  assessmentTypes = ['Biological assessment', 'Radiological assessment'];
  constructor(
    private addAssessmentModalService: AddAssessmentModalService,
    private fb: FormBuilder
  ) {
    this.assessmentForm = this.fb.group({
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
      assessmentDate: ['', [Validators.required]],
      assessmentType: ['', [Validators.required]],
      assessments: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ]),
      ]),
    });
  }
  ngOnInit(): void {
    this.addAssessmentModalService.isAddAssessmentModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
  }
  closeModal() {
    this.addAssessmentModalService.closeModal();
  }
  isSignaturePadOpen = false;
  openSignaturePad() {
    this.isSignaturePadOpen = true;
  }
  get assessments() {
    return this.assessmentForm.get('assessments') as FormArray;
  }
  addAssessment() {
    const newAssessment = this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]);
    this.assessments.push(newAssessment);
  }
  removeAssessment(index: number) {
    this.assessments.removeAt(index);
  }
  onSubmit() {
    if (this.assessmentForm.valid && this.signatureUrl) {
      const data = {
        ...this.assessmentForm.value,
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
