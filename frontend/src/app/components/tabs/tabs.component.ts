import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ttab } from '../../types/tab.type';
import { AddPrescriptionModalService } from '../../services/add-prescription-modal.service';
import { AddAssessmentModalService } from '../../services/add-assessment-modal.service';
import { AddSummaryModalService } from '../../services/add-summary-modal.service';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  @Input() tabs: Ttab[] = [];
  @Input() activeTab: Ttab = this.tabs[0];
  @Output() tabChanged = new EventEmitter<Ttab>();
  setActiveTab(tab: Ttab) {
    this.tabChanged.emit(tab);
  }
  constructor(
    private addPrescriptionModalService: AddPrescriptionModalService,
    private addAssessmentModalService: AddAssessmentModalService,
    private addSummaryModalService: AddSummaryModalService
  ) {}
  addPrescription() {
    this.addPrescriptionModalService.openModal();
  }
  addAssessment() {
    this.addAssessmentModalService.openModal();
  }
  addSummary() {
    this.addSummaryModalService.openModal();
  }
}
