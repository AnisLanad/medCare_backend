import {Nurse} from '../../services/nurses.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModifyNurseComponent} from '../modify-patient/modify-nurse.component';

@Component({
  selector: 'app-nurse-row',
  standalone: true,
  imports: [CommonModule, ModifyNurseComponent],
  template: `
    <div *ngIf="nurse" class="grid grid-cols-[60px_120px_1fr_1fr_1fr_100px] gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100">
      <div class="truncate font-medium">{{ nurse.id }}</div>
      <div class="truncate font-medium">{{ nurse.Nom }}</div>
      <div class="truncate">{{ nurse.Prenom }}</div>
      <div class="truncate">{{ nurse.Telephone }}</div>
      <div class="truncate">{{ nurse.Email }}</div>
      <div class="flex gap-2 justify-center">
        <button
          class="p-2 rounded transition bg-green-200 hover:bg-green-300"
          (click)="openEditPopup()">
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="p-2 rounded transition bg-red-200 hover:bg-red-300"
          (click)="onDelete.emit(nurse.id)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <app-modify-nurse
      *ngIf="nurse"
      [nurse]="nurse"
      [isVisible]="isEditPopupVisible"
      (close)="closeEditPopup()"
      (save)="saveNurse($event)"
    ></app-modify-nurse>
  `,
})
export class NurseRowComponent {
  @Input() nurse?: Nurse;
  @Output() onEdit = new EventEmitter<Nurse>();
  @Output() onDelete = new EventEmitter<number>();

  isEditPopupVisible = false;

  openEditPopup() {
    if (this.nurse) {
      this.isEditPopupVisible = true;
    }
  }

  closeEditPopup() {
    this.isEditPopupVisible = false;
  }

  saveNurse(updatedNurse: Nurse) {
    this.onEdit.emit(updatedNurse);
    this.closeEditPopup();
  }
}
