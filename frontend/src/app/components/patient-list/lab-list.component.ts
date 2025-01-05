// src/app/components/lab-list/lab-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabService, Lab } from '../../services/lab.services';
import { HttpClientModule } from '@angular/common/http';
import { LabRowComponent } from '../patient-row/lab-row.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule, LabRowComponent, HttpClientModule],
  template: `
    <div class="lab-list">
      <div class="header-row">
        <div class="header-cell id">ID</div>
        <div class="header-cell name">Last Name</div>
        <div class="header-cell">First Name</div>
        <div class="header-cell">Phone</div>
        <div class="header-cell">Email</div>
        <div class="header-cell actions">Actions</div>
      </div>
      <div *ngIf="labs.length === 0" class="p-4 text-center text-gray-500">
        No labs found
      </div>

      <app-lab-row
        *ngFor="let lab of labs"
        [lab]="lab"
        (onEdit)="handleEdit($event)"
        (onDelete)="handleDelete($event)"
      ></app-lab-row>
    </div>
  `,
  styles: [`
    .lab-list {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
    }
    .header-row {
      display: grid;
      grid-template-columns: 60px 120px 1fr 1fr 1fr 100px;
      gap: 16px;
      padding: 12px;
      background-color: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
      font-weight: 600;
      color: #212529;
      font-size: 14px;
      line-height: 23.8px;
    }
    .header-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 600;
      color: #212529;
      line-height: 24px;
    }
    .actions {
      text-align: center;
    }
  `]
})
export class LabListComponent implements OnInit, OnDestroy {
  labs: Lab[] = [];
  private labsSubscription: Subscription | null = null;

  constructor(private labService: LabService) {}

  ngOnInit(): void {
    this.labsSubscription = this.labService.getLabs().subscribe({
      next: (labs) => {
        console.log('Received updated labs list:', labs);
        this.labs = labs ? [...labs] : [];
      },
      error: (error) => {
        console.error('Error in labs subscription:', error);
        this.labs = [];
      },
    });
  }

  ngOnDestroy(): void {
    if (this.labsSubscription) {
      this.labsSubscription.unsubscribe();
    }
  }

  handleEdit(lab: Lab): void {
    if (!lab || !lab.id) {
      console.error('Invalid lab data');
      return;
    }

    this.labService.updateLab(lab.id, lab).subscribe({
      next: (updatedLab) => {
        console.log('Lab updated successfully:', updatedLab);
      },
      error: (error) => {
        console.error('Error updating lab:', error);
      },
    });
  }

  handleDelete(id: number): void {
    if (!id) {
      console.error('Invalid lab ID');
      return;
    }

    this.labService.deleteLab(id).subscribe({
      next: () => {
        console.log('Lab deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting lab:', error);
      },
    });
  }
}
