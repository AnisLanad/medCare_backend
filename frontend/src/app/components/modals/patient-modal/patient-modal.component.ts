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
@Component({
  selector: 'app-patient-modal',
  imports: [CommonModule, DynamicTableComponent, TabsComponent],
  templateUrl: './patient-modal.component.html',
  styleUrl: './patient-modal.component.css',
  animations: [fadeInOut],
})
export class PatientModalComponent implements OnInit {
  isOpen = false;
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
  constructor(private patientModalService: PatientModalService) {}
  ngOnInit(): void {
    this.patientModalService.isPatientModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
  closeModal() {
    this.patientModalService.closeModal();
  }
  summaryTableColumns: TColumn<Tsummary>[] = [
    {
      key: 'summary',
      label: 'Summary',
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
      key: 'diagnosticStatus',
      label: 'Diagnostic status',
      render: (value: Tsummary) =>
        `<span>${
          value.diagnosticStatus === 'established'
            ? '<i class="fa-solid fa-check text-green-600"></i>'
            : '<i class="fa-solid fa-xmark text-red-600"></i>'
        } ${value.diagnosticStatus}</span>`,
    },
  ];
  summaryTableData: Tsummary[] = [
    {
      summary: 'Summary',
      doctor: 'Doctor',
      date: 'Date',
      diagnosticStatus: 'established',
    },
    {
      summary: 'Summary',
      doctor: 'Doctor',
      date: 'Date',
      diagnosticStatus: 'not established',
    },
    {
      summary: 'Summary',
      doctor: 'Doctor',
      date: 'Date',
      diagnosticStatus: 'not established',
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
      key: 'assessment',
      label: 'Assessment',
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
      render: (value: Tassessment) =>
        `<span>${
          value.status === 'valid'
            ? '<i class="fa-solid fa-check text-green-600"></i>'
            : '<i class="fa-solid fa-xmark text-red-600"></i>'
        } ${value.status}</span>`,
    },
  ];
  assessmentTableData: Tassessment[] = [
    {
      assessment: 'Assessment',
      doctor: 'Doctor',
      date: 'Date',
      status: 'valid',
    },
    {
      assessment: 'Assessment',
      doctor: 'Doctor',
      date: 'Date',
      status: 'not valid',
    },
    {
      assessment: 'Assessment',
      doctor: 'Doctor',
      date: 'Date',
      status: 'not valid',
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
