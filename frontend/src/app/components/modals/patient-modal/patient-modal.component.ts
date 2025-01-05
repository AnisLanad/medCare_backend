import { Component, OnInit } from '@angular/core';
import { PatientModalService } from '../../../services/patient-modal.service';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { TColumn } from '../../../types/column.type';
import { Ttab } from '../../../types/tab.type';
import { TabsComponent } from '../../tabs/tabs.component';
import { Tsummary } from '../../../types/summary.type';
import { Tprescription } from '../../../types/prescription.type';
import { Tassessment } from '../../../types/assessment.type';
import { fadeInOut } from '../../../animations/animations';
import { Tpatient } from '../../../types/patient.type';
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { Perform } from '../../../utils/Perform';
@Component({
  selector: 'app-patient-modal',
  imports: [CommonModule, DynamicTableComponent, TabsComponent],
  templateUrl: './patient-modal.component.html',
  styleUrl: './patient-modal.component.css',
  animations: [fadeInOut],
})
export class PatientModalComponent implements OnInit {
  isOpen = false;
  patient: Tpatient | null = null;
  patientSummary: Tsummary[] = [];
  patientAssessments: any = [];
  tabs: Ttab[] = [
    {
      key: 'summary',
      label: 'Summary',
    },
    {
      key: 'prescription',
      label: 'Prescription',
    },
    {
      key: 'assessment',
      label: 'Assessment',
    },
  ];
  activeTab = this.tabs[0];
  setActiveTab(tab: Ttab) {
    this.activeTab = tab;
  }
  constructor(
    private patientModalService: PatientModalService,
    private searchedPatientService: SearchedPatientService
  ) {}
  summaryData = new Perform<any>();
  ngOnInit(): void {
    this.patientModalService.isPatientModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.searchedPatientService.SearchedPatient$.subscribe((patient) => {
      this.patient = patient;
    });
    this.searchedPatientService.patientSummary$.subscribe((patientSummary) => {
      this.patientSummary = patientSummary;
    });
    this.searchedPatientService.patientAssessments$.subscribe(
      (patientAssessments) => {
        this.patientAssessments = patientAssessments;
      }
    );
  }
  closeModal() {
    this.patientModalService.closeModal();
  }
  summaryTableColumns: TColumn<Partial<Tsummary>>[] = [
    {
      key: 'Consultation_ID',
      label: 'Summary ID',
    },
    {
      key: 'Datecons',
      label: 'Date',
    },
    {
      key: 'nextConsultation',
      label: 'Next Consultation',
    },
    {
      key: 'diagnosticEstablished',
      label: 'Diagnostic status',
      render: (value) =>
        `<span>${
          value.diagnosticEstablished
            ? '<i class="fa-solid fa-check text-green-600"></i> established'
            : '<i class="fa-solid fa-xmark text-red-600"></i> not established'
        }</span>`,
    },
  ];
  prescriptionTableColumns: TColumn<Tprescription>[] = [
    {
      key: 'ordonnance',
      label: 'Ordonnance',
    },
    {
      key: 'doctor',
      label: 'Doctor',
    },
    {
      key: 'date',
      label: 'Date',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: Tprescription) =>
        `<span>${
          value.status === 'valid'
            ? '<i class="fa-solid fa-check text-green-600"></i>'
            : '<i class="fa-solid fa-xmark text-red-600"></i>'
        } ${value.status}</span>`,
    },
  ];
  prescriptionTableData: Tprescription[] = [
    {
      ordonnance: 'Ordonnance',
      doctor: 'Doctor',
      date: 'Date',
      status: 'valid',
    },
    {
      ordonnance: 'Ordonnance',
      doctor: 'Doctor',
      date: 'Date',
      status: 'not valid',
    },
    {
      ordonnance: 'Ordonnance',
      doctor: 'Doctor',
      date: 'Date',
      status: 'not valid',
    },
    {
      ordonnance: 'Ordonnance',
      doctor: 'Doctor',
      date: 'Date',
      status: 'valid',
    },
  ];
  assessmentTableColumns: TColumn<Tassessment>[] = [
    {
      key: 'id',
      label: 'Assessment ID',
    },
    {
      key: 'Type',
      label: 'Assessment Type',
    },
    {
      key: 'Date',
      label: 'Date',
    },
    {
      key: 'Laborantin',
      label: 'Status',
      render: (value: Tassessment) =>
        `<span>${
          value.Laborantin || value.RadiologistName
            ? '<i class="fa-solid fa-check text-green-600"></i> valid'
            : '<i class="fa-solid fa-xmark text-red-600"></i> not valid'
        }</span>`,
    },
  ];

  summaryAction(data: Tsummary) {
    alert(JSON.stringify(data));
  }

  prescriptionAction(data: Tprescription) {
    alert(JSON.stringify(data));
  }

  assessmentAction(data: Tassessment) {
    alert(JSON.stringify(data));
  }
}
