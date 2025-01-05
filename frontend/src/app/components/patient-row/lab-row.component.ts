// src/app/components/lab-row/lab-row.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lab } from '../../services/lab.services';
import { ModifyLabComponent } from '../modify-patient/modify-lab.component';

@Component({
  selector: 'app-lab-row',
  standalone: true,
  imports: [CommonModule, ModifyLabComponent],
  template: `
    <div *ngIf="lab" class="grid grid-cols-[60px_120px_1fr_1fr_1fr_100px] gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100">
      <div class="truncate font-medium">{{ lab.id }}</div>
      <div class="truncate font-medium">{{ lab.Nom }}</div>
      <div class="truncate">{{ lab.Prenom }}</div>
      <div class="truncate">{{ lab.Telephone }}</div>
      <div class="truncate">{{ lab.Email }}</div>
      <div class="flex gap-2 justify-center">
        <button
          class="p-2 rounded transition bg-green-200 hover:bg-green-300"
          (click)="openEditPopup()">
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="p-2 rounded transition bg-red-200 hover:bg-red-300"
          (click)="onDelete.emit(lab.id)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <app-modify-lab
      *ngIf="lab"
      [lab]="lab"
      [isVisible]="isEditPopupVisible"
      (close)="closeEditPopup()"
      (save)="saveLab($event)"
    ></app-modify-lab>
  `,
})
export class LabRowComponent {
  @Input() lab?: Lab;
  @Output() onEdit = new EventEmitter<Lab>();
  @Output() onDelete = new EventEmitter<number>();

  isEditPopupVisible = false;

  openEditPopup() {
    if (this.lab) {
      this.isEditPopupVisible = true;
    }
  }

  closeEditPopup() {
    this.isEditPopupVisible = false;
  }

  saveLab(updatedLab: Lab) {
    this.onEdit.emit(updatedLab);
    this.closeEditPopup();
  }
}
