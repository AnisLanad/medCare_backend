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
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { Tpatient } from '../../../types/patient.type';
import { AssessmentService } from '../../../services/AssessmentService/assessment.service';

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
  patient: Tpatient | null = null;
  constructor(
    private addAssessmentModalService: AddAssessmentModalService,
    private fb: FormBuilder,
    private searchedPatientService: SearchedPatientService,
    private assessmentService: AssessmentService
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
      age: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
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
    this.searchedPatientService.SearchedPatient$.subscribe((patient) => {
      this.patient = patient;
      this.assessmentForm.get('firstName')?.setValue(this.patient?.Prenom);
      this.assessmentForm.get('lastName')?.setValue(this.patient?.Nom);
      this.assessmentForm.get('age')?.setValue(this.patient?.age);
      this.assessmentForm.get('nss')?.setValue(this.patient?.NSS);
    });
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
        Medecin: 2,
        Patient: this.patient?.DPI_ID,
        Type: this.assessmentForm.get('assessmentType')?.value,
        Informations: this.assessmentForm.get('assessments')?.value[0],
      };
      this.assessmentService.addAssessment(data).subscribe((data) => {
        this.closeModal();
      });
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
