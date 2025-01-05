import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../services/doctor.service';
import {ModifyDoctorComponent} from '../modify-patient/modify-doctor.component';

@Component({
  selector: 'app-doctor-row',
  standalone: true,
  imports: [CommonModule, ModifyDoctorComponent, ModifyDoctorComponent],
  template: `
    <div class="grid grid-cols-[60px_120px_1fr_1fr_1fr_100px_100px] gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100">
      <div class="truncate font-medium">{{doctor.id}}</div>
      <div class="truncate font-medium">{{doctor.name.last}}</div>
      <div class="truncate">{{doctor.specialtyDisplay}}</div>
      <div class="truncate">{{doctor.phoneNumber}}</div>
      <div class="truncate">{{doctor.email}}</div>
      <div class="truncate text-center">{{doctor.patients?.length || 0}}</div>
      <div class="flex gap-2 justify-center">
        <button
          class="p-2 rounded transition bg-green-200 hover:bg-green-300"
          (click)="openEditPopup()">
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="p-2 rounded transition bg-red-200 hover:bg-red-300"
          (click)="onDelete.emit(doctor.id ? +doctor.id : undefined)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <app-modify-doctor
      [doctor]="doctor"
      [isVisible]="isEditPopupVisible"
      (close)="closeEditPopup()"
      (save)="saveDoctor($event)"
    ></app-modify-doctor>
  `,
})
export class DoctorRowComponent {
  @Input() doctor!: Doctor;
  @Output() onEdit = new EventEmitter<Doctor>();
  @Output() onDelete = new EventEmitter<number>();

  isEditPopupVisible = false;

  openEditPopup() {
    this.isEditPopupVisible = true;
  }

  closeEditPopup() {
    this.isEditPopupVisible = false;
  }

  saveDoctor(updatedDoctor: Doctor) {
    this.onEdit.emit(updatedDoctor);
    this.closeEditPopup();
  }
}
