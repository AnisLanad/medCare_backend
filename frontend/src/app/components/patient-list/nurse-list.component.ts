import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseService, Nurse } from '../../services/nurses.service'; // Import the updated Nurse interface
import { HttpClientModule } from '@angular/common/http';
import { NurseRowComponent } from '../patient-row/nurse-row.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nurse-list',
  standalone: true,
  imports: [CommonModule, NurseRowComponent, HttpClientModule],
  template: `
    <div class="nurse-list">
      <div class="header-row">
        <div class="header-cell id">ID</div>
        <div class="header-cell name">Last Name</div>
        <div class="header-cell">First Name</div>
        <div class="header-cell">Phone</div>
        <div class="header-cell">Email</div>
        <div class="header-cell actions">Actions</div>
      </div>
      <div *ngIf="nurses.length === 0" class="p-4 text-center text-gray-500">
        No nurses found
      </div>

      <app-nurse-row
        *ngFor="let nurse of nurses"
        [nurse]="nurse"
        (onEdit)="handleEdit($event)"
        (onDelete)="handleDelete($event)"
      ></app-nurse-row>
    </div>
  `,
  styles: [`
    .nurse-list {
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
export class NurseListComponent implements OnInit, OnDestroy {
  nurses: Nurse[] = []; // Use the updated Nurse interface
  private nursesSubscription: Subscription | null = null;

  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    this.nursesSubscription = this.nurseService.getNurses().subscribe({
      next: (nurses) => {
        console.log('Received updated nurses list:', nurses);
        this.nurses = nurses ? [...nurses] : [];
      },
      error: (error) => {
        console.error('Error in nurses subscription:', error);
        this.nurses = [];
      },
    });
  }

  ngOnDestroy(): void {
    if (this.nursesSubscription) {
      this.nursesSubscription.unsubscribe();
    }
  }

  handleEdit(nurse: Nurse): void {
    if (!nurse || !nurse.id) {
      console.error('Invalid nurse data');
      return;
    }

    this.nurseService.updateNurse(nurse.id, nurse).subscribe({
      next: (updatedNurse) => {
        console.log('Nurse updated successfully:', updatedNurse);
      },
      error: (error) => {
        console.error('Error updating nurse:', error);
      },
    });
  }

  handleDelete(id: number): void {
    if (!id) {
      console.error('Invalid nurse ID');
      return;
    }

    this.nurseService.deleteNurse(id).subscribe({
      next: () => {
        console.log('Nurse deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting nurse:', error);
      },
    });
  }
}
