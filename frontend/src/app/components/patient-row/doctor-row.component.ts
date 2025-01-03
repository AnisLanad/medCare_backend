import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row-container">
      <div class="cell id">{{ doctor.id }}</div>
      <div class="cell name">{{ doctor.name.first }} {{ doctor.name.last }}</div>
      <div class="cell">{{ doctor.specialtyDisplay }}</div>
      <div class="cell">{{ doctor.phoneNumber }}</div>
      <div class="cell">{{ doctor.email }}</div>
      <div class="cell">{{ doctor.patients?.length || 0 }}</div>
      <div class="cell actions">
        <button class="edit-btn" (click)="edit()">Edit</button>
        <button class="delete-btn" (click)="delete()">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    .row-container {
      display: grid;
      grid-template-columns: 60px 120px 1fr 1fr 1fr 100px 100px;
      gap: 16px;
      padding: 12px;
      border-bottom: 1px solid #e9ecef;
      align-items: center;
      transition: background-color 0.2s;
    }

    .row-container:hover {
      background-color: #f8f9fa;
    }

    .cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    button {
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.2s;
    }

    .edit-btn {
      background-color: #0d6efd;
      color: white;
    }

    .edit-btn:hover {
      background-color: #0b5ed7;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background-color: #bb2d3b;
    }
  `]
})
export class DoctorRowComponent {
  @Input() doctor!: Doctor;
  @Output() onEdit = new EventEmitter<Doctor>();
  @Output() onDelete = new EventEmitter<number>();

  edit(): void {
    this.onEdit.emit(this.doctor);
  }

  delete(): void {
    this.onDelete.emit(this.doctor.id);
  }
}
