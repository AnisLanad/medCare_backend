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
import { Tpatient } from '../../../types/patient.type';
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { PrescriptionService } from '../../../services/Prescription/prescription.service';

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
  patient: Tpatient | null = null;
  medicaments = [
    {
      id: 1,
      Nom: 'Paracetamol',
      Dosage: '500mg',
      Fabricant: 'PharmaCorp',
      Forme: 'comprimé',
    },
    {
      id: 2,
      Nom: 'Ibuprofène',
      Dosage: '400mg',
      Fabricant: 'MedHealth',
      Forme: 'capsule',
    },
    {
      id: 3,
      Nom: 'Amoxicilline',
      Dosage: '250mg/5ml',
      Fabricant: 'BioMedics',
      Forme: 'sirop',
    },
    {
      id: 4,
      Nom: 'Diclofénac',
      Dosage: '1%',
      Fabricant: 'HealLife',
      Forme: 'pommade',
    },
    {
      id: 5,
      Nom: 'Vitamine C',
      Dosage: '1g',
      Fabricant: 'NutriPharma',
      Forme: 'comprimé',
    },
    {
      id: 6,
      Nom: 'Loratadine',
      Dosage: '10mg',
      Fabricant: 'AntiAllergy Ltd',
      Forme: 'comprimé',
    },
    {
      id: 7,
      Nom: 'Oméprazole',
      Dosage: '20mg',
      Fabricant: 'GastroCare',
      Forme: 'capsule',
    },
    {
      id: 8,
      Nom: 'Aspirine',
      Dosage: '100mg',
      Fabricant: 'ASA Pharma',
      Forme: 'comprimé',
    },
    {
      id: 9,
      Nom: 'Pseudoéphédrine',
      Dosage: '30mg/5ml',
      Fabricant: 'Decongest Inc',
      Forme: 'sirop',
    },
    {
      id: 10,
      Nom: 'Bépanthène',
      Dosage: '5%',
      Fabricant: 'SkinHealth',
      Forme: 'pommade',
    },
  ];
  constructor(
    private addPrescriptionModalService: AddPrescriptionModalService,
    private fb: FormBuilder,
    private searchedPatientService: SearchedPatientService,
    private prescriptionService: PrescriptionService
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
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
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
        this.createTreatmentGroup(), // Initialize with one treatment
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
    this.searchedPatientService.SearchedPatient$.subscribe((patient) => {
      this.patient = patient;
      this.prescriptionForm.get('firstName')?.setValue(this.patient?.Prenom);
      this.prescriptionForm.get('lastName')?.setValue(this.patient?.Nom);
      this.prescriptionForm.get('age')?.setValue(this.patient?.age);
      this.prescriptionForm.get('nss')?.setValue(this.patient?.NSS);
    });
  }
  closeModal() {
    this.addPrescriptionModalService.closeModal();
  }
  get treatments(): FormArray {
    return this.prescriptionForm.get('treatments') as FormArray;
  }
  createTreatmentGroup(): FormGroup {
    return this.fb.group({
      id: [this.medicaments[0]?.id, Validators.required],
      posologie: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
    });
  }
  // Add a new treatment group
  addTreatment(): void {
    this.treatments.push(this.createTreatmentGroup());
  }

  // Remove a treatment group by index
  removeTreatment(index: number): void {
    this.treatments.removeAt(index);
  }
  onSubmit() {
    if (this.prescriptionForm.valid && this.signatureUrl) {
      const data = {
        Consultation: 1,
        Description: this.prescriptionForm.get('description')?.value,
      };
      this.prescriptionService
        .createPrescription(data)
        .subscribe((data: any) => {
          console.log(data);
          this.prescriptionForm
            .get('treatments')
            ?.value.forEach((treatment: any) => {
              this.prescriptionService
                .createTreatment({
                  Ordonnance: data.id,
                  Medicament: treatment.id,
                  Posologie: treatment.posologie,
                })
                .subscribe((data) => console.log(data));
            });
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
