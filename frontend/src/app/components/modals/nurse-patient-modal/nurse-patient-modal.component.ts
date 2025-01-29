import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { TColumn } from '../../../types/column.type';
import { Ttab } from '../../../types/tab.type';
import { Tsummary } from '../../../types/summary2.type';
import { Tprescription } from '../../../types/prescription.type';
import { Tassessment } from '../../../types/assessment2.type';
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
  //*___________________________________________________*//
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
      label: 'Nursing summary',
      render: (value: Tsummary) =>
        `<span>${
          value.diagnosticStatus === 'established'
            ? '<i class="fa-solid fa-check text-green-600"></i>'
            : '<i class="fa-solid fa-xmark text-red-600"></i>'
        } ${value.diagnosticStatus}</span>`,
    },
  ];
  summaryTableData: Tsummary[] = [];

  summaryAction(data: Tsummary) {
    alert(JSON.stringify(data));
  }
}
