import { CommonModule } from '@angular/common';
import {Component,Input,OnChanges,OnInit,SimpleChanges,} from '@angular/core';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { TColumn } from '../../types/column.type';
import { NursePatientModalComponent as NursePatientsModalComponent } from '../modals/nurse-patient-modal/nurse-patient-modal.component';
import { NursePatientModalService } from '../../services/nurse-patient-modal.service';

import { NurseDetailsModalService } from '../../services/add-nurse-summary-modal.service';
import { AddSummaryModalComponent } from "../modals/add-nurse-summary-modal/add-nurse-summary-modal.component";
@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, TablePaginationComponent,NursePatientsModalComponent,AddSummaryModalComponent],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
})
export class DynamicTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TColumn<T>[] = [];
  @Input() pageSize: number = 2;
  @Input() action: (data: T) => void = () => {};
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedData: T[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.updatePaginatedData();
    }
  }
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.data.slice(
      startIndex,
      startIndex + this.pageSize
    ); 
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedData(); 
  }
    constructor(
      private patientModalService : NursePatientModalService,
      private nursePatientModalService: NurseDetailsModalService,
    ){}
    openpatientModal() {
      this.patientModalService.openModal();
    }
    addSummary() {
      this.nursePatientModalService.openModal();
    }
  
}
