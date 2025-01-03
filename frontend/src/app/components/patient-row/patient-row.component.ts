import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '../modals/patient.interface';
import { ModifyPatientComponent } from '../modify-patient/modify-patient.component';


@Component({
  selector: 'app-patient-row',
  standalone: true,
  imports: [CommonModule, ModifyPatientComponent],
  template: `
    <div class="grid grid-cols-[60px_120px_1fr_1fr_1fr_1fr_100px] gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100">
      <div class="truncate font-medium">{{patient.id}}</div>
      <div class="truncate font-medium">{{patient.name.last}}</div>
      <div class="truncate">{{patient.birthDate}}</div>
      
      <div class="truncate">{{patient.nss}}</div>
      <div class="flex gap-2 justify-center">
        <button
            class="p-2 rounded transition bg-green-200 hover:bg-green-300"
            (click)="openEditPopup()">
          <i class="fas fa-edit"></i>
        </button>
        <button
            class="p-2 rounded transition bg-red-200 hover:bg-red-300"
            (click)="onDelete.emit(patient.id ? +patient.id : undefined)"        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <app-modify-patient
        [patient]="patient"
        [isVisible]="isEditPopupVisible"
        (close)="closeEditPopup()"
        (save)="savePatient($event)"
    ></app-modify-patient>
  `,
})
export class PatientRowComponent {
  @Input() patient!: Patient;
  @Output() onEdit = new EventEmitter<Patient>();
  @Output() onDelete = new EventEmitter<number>();

  isEditPopupVisible = false;

  openEditPopup() {
    this.isEditPopupVisible = true;
  }

  closeEditPopup() {
    this.isEditPopupVisible = false;
  }

  savePatient(updatedPatient: Patient) {
    this.onEdit.emit(updatedPatient);
    this.closeEditPopup();
  }
}
