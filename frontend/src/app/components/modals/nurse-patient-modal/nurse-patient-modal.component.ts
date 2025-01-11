import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { TColumn } from '../../../types/column.type';
import { Ttab } from '../../../types/tab.type';
import { Tsummary } from '../../../types/summary.type';
import { Tprescription } from '../../../types/prescription.type';
import { Tassessment } from '../../../types/assessment.type';
import { fadeInOut } from '../../../animations/animations';
import { NursePatientModalService } from '../../../services/nurse-patient-modal.service';
import { NurseDetailsModalService } from '../../../services/add-nurse-summary-modal.service';
import { AddSummaryModalComponent } from "../add-nurse-summary-modal/add-nurse-summary-modal.component";

@Component({
  selector: 'app-nurse-patient-modal',
  imports: [CommonModule, DynamicTableComponent, AddSummaryModalComponent],
  templateUrl: './nurse-patient-modal.component.html',
  styleUrl: './nurse-patient-modal.component.css',
  animations: [fadeInOut],
})
export class NursePatientModalComponent implements OnInit {
  constructor(
    private patientModalService: NursePatientModalService,

    private nursePatientModalService: NurseDetailsModalService,
    
  ) {}

  addSummary() {
    this.nursePatientModalService.openModal();
  }
  isOpen = false;
  tabs: Ttab[] = [
    {
      key: 'summary',
      label: 'Summary',
    },
  ];
  activeTab = this.tabs[0];
  setActiveTab(tab: Ttab) {
    this.activeTab = tab;
  }

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

  summaryAction(data: Tsummary) {
    alert(JSON.stringify(data));
  }
}

// import { Component, OnInit } from '@angular/core';
// import { NursePatientModalService } from '../../../services/nurse-patient-modal.service';
// import { CommonModule } from '@angular/common';
// import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
// import { TColumn } from '../../../types/column.type';
// import { Ttab } from '../../../types/tab.type';
// import { TabsComponent } from '../../tabs/tabs.component';
// import { Tsummary } from '../../../types/summary.type';
// import { Tprescription } from '../../../types/prescription.type';
// import { Tassessment } from '../../../types/assessment.type';
// import { fadeInOut } from '../../../animations/animations';

// @Component({
//   selector: 'app-nurse-patient-modal',
//   imports: [CommonModule, DynamicTableComponent, TabsComponent],
//   templateUrl: './nurse-patient-modal.component.html',
//   styleUrl: './nurse-patient-modal.component.css',
//   animations: [fadeInOut],
// })
// export class NursePatientModalComponent implements OnInit {
//   isOpen = false;
//   tabs: Ttab[] = [
//     {
//       key: 'summary',
//       label: 'Summary',
//     },
//     {
//       key: 'prescription',
//       label: 'Prescription',
//     },
//     {
//       key: 'assessment',
//       label: 'Assessment',
//     },
//   ];
//   activeTab = this.tabs[0];
//   setActiveTab(tab: Ttab) {
//     this.activeTab = tab;
//   }
//   constructor(private patientModalService: NursePatientModalService) {}
//   ngOnInit(): void {
//     this.patientModalService.isPatientModalOpen$.subscribe((isOpen) => {
//       this.isOpen = isOpen;
//     });
//   }
//   closeModal() {
//     this.patientModalService.closeModal();
//   }
//   summaryTableColumns: TColumn<Tsummary>[] = [
//     {
//       key: 'summary',
//       label: 'Summary',
//     },
//     {
//       key: 'doctor',
//       label: 'Doctor',
//     },
//     {
//       key: 'date',
//       label: 'Date',
//     },
//     {
//       key: 'diagnosticStatus',
//       label: 'Diagnostic status',
//       render: (value: Tsummary) =>
//         `<span>${
//           value.diagnosticStatus === 'established'
//             ? '<i class="fa-solid fa-check text-green-600"></i>'
//             : '<i class="fa-solid fa-xmark text-red-600"></i>'
//         } ${value.diagnosticStatus}</span>`,
//     },
//   ];
//   summaryTableData: Tsummary[] = [
//     {
//       summary: 'Summary',
//       doctor: 'Doctor',
//       date: 'Date',
//       diagnosticStatus: 'established',
//     },
//     {
//       summary: 'Summary',
//       doctor: 'Doctor',
//       date: 'Date',
//       diagnosticStatus: 'not established',
//     },
//     {
//       summary: 'Summary',
//       doctor: 'Doctor',
//       date: 'Date',
//       diagnosticStatus: 'not established',
//     },
//   ];
//   prescriptionTableColumns: TColumn<Tprescription>[] = [
//     {
//       key: 'ordonnance',
//       label: 'Ordonnance',
//     },
//     {
//       key: 'doctor',
//       label: 'Doctor',
//     },
//     {
//       key: 'date',
//       label: 'Date',
//     },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (value: Tprescription) =>
//         `<span>${
//           value.status === 'valid'
//             ? '<i class="fa-solid fa-check text-green-600"></i>'
//             : '<i class="fa-solid fa-xmark text-red-600"></i>'
//         } ${value.status}</span>`,
//     },
//   ];
//   prescriptionTableData: Tprescription[] = [
//     {
//       ordonnance: 'Ordonnance',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'valid',
//     },
//     {
//       ordonnance: 'Ordonnance',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'not valid',
//     },
//     {
//       ordonnance: 'Ordonnance',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'not valid',
//     },
//     {
//       ordonnance: 'Ordonnance',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'valid',
//     },
//   ];
//   assessmentTableColumns: TColumn<Tassessment>[] = [
//     {
//       key: 'assessment',
//       label: 'Assessment',
//     },
//     {
//       key: 'doctor',
//       label: 'Doctor',
//     },
//     {
//       key: 'date',
//       label: 'Date',
//     },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (value: Tassessment) =>
//         `<span>${
//           value.status === 'valid'
//             ? '<i class="fa-solid fa-check text-green-600"></i>'
//             : '<i class="fa-solid fa-xmark text-red-600"></i>'
//         } ${value.status}</span>`,
//     },
//   ];
//   assessmentTableData: Tassessment[] = [
//     {
//       assessment: 'Assessment',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'valid',
//     },
//     {
//       assessment: 'Assessment',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'not valid',
//     },
//     {
//       assessment: 'Assessment',
//       doctor: 'Doctor',
//       date: 'Date',
//       status: 'not valid',
//     },
//   ];

//   summaryAction(data: Tsummary) {
//     alert(JSON.stringify(data));
//   }

//   prescriptionAction(data: Tprescription) {
//     alert(JSON.stringify(data));
//   }

//   assessmentAction(data: Tassessment) {
//     alert(JSON.stringify(data));
//   }
// }

// <div
//   *ngIf="isOpen"
//   id="modal"
//   aria-labelledby="modal-title"
//   role="dialog"
//   [@fadeInOut]="isOpen"
//   class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"
// >
//   <div
//     class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-2xl p-4 sm:p-8 relative"
//     role="dialog"
//     aria-labelledby="modal-title"
//     aria-describedby="modal-description"
//   >
//     <!-- Close Button -->
//     <button
//       class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//       (click)="closeModal()"
//     >
//       <i class="fas fa-times text-2xl"></i>
//     </button>
//     <!-- Header -->
//     <div
//       class="flex flex-col sm:flex-row items-start gap-y-3 sm:items-center justify-between px-4 sm:px-6 py-4"
//     >
//       <div class="flex items-center space-x-4">
//         <img
//           class="w-16 h-16 rounded-full"
//           src="https://randomuser.me/api/portraits/men/1.jpg"
//           alt="Patient Picture"
//         />
//         <div>
//           <h2 class="text-xl font-semibold">Ahcen Chabbi</h2>
//           <p class="text-gray-500">Something about the patient</p>
//         </div>
//       </div>
//       <!-- (click)="messagePatient(patient.id)" -->
//       <button
//         class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
//       >
//         Message
//       </button>
//     </div>
//     <!-- Tabs -->
//     <app-tabs
//       [tabs]="tabs"
//       [activeTab]="activeTab"
//       (tabChanged)="setActiveTab($event)"
//     />
//     <!-- Table Content -->
//     <div class="px-4 sm:px-6 py-4">
//       <ng-container *ngIf="activeTab.key === 'summary'">
//         <app-dynamic-table
//           [columns]="summaryTableColumns"
//           [data]="summaryTableData"
//           [action]="summaryAction"
//         />
//       </ng-container>
//       <ng-container *ngIf="activeTab.key === 'prescription'">
//         <app-dynamic-table
//           [columns]="prescriptionTableColumns"
//           [data]="prescriptionTableData"
//           [action]="prescriptionAction"
//         />
//       </ng-container>
//       <ng-container *ngIf="activeTab.key === 'assessment'">
//         <app-dynamic-table
//           [columns]="assessmentTableColumns"
//           [data]="assessmentTableData"
//           [action]="assessmentAction"
//         />
//       </ng-container>
//     </div>
//   </div>
// </div>
