// add-patient.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../modals/patient.interface';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6">
        <h2 class="text-2xl font-semibold text-blue-600 text-center mb-6">
          Add New Patient
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="firstName" class="text-sm text-gray-600 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                [(ngModel)]="newPatient.name.first"
                placeholder="First Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                [(ngModel)]="newPatient.name.last"
                placeholder="Last Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex flex-col">
            <label for="socialSecurity" class="text-sm text-gray-600 mb-1">Social Security Number</label>
            <input
              id="socialSecurity"
              type="text"
              [(ngModel)]="newPatient.nss"
              placeholder="Social security number"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="birthDate" class="text-sm text-gray-600 mb-1">Birth Date</label>
              <input
                id="birthDate"
                type="date"
                [(ngModel)]="newPatient.birthDate"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="phoneNumber" class="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                [(ngModel)]="newPatient.phoneNumber"
                placeholder="Phone number"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex flex-col">
            <label for="address" class="text-sm text-gray-600 mb-1">Address</label>
            <input
              id="address"
              type="text"
              [(ngModel)]="newPatient.address"
              placeholder="Address"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
          </div>

          <div class="flex flex-col">
            <label for="assignedDoctor" class="text-sm text-gray-600 mb-1">Doctor Name</label>
            <input
              id="assignedDoctor"
              type="text"
              [(ngModel)]="newPatient.assignedDoctor"
              placeholder="Doctor Name"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
          </div>

          <div class="flex flex-col">
            <label for="disease" class="text-sm text-gray-600 mb-1">Disease</label>
            <input
              id="disease"
              type="text"
              [(ngModel)]="newPatient.disease"
              placeholder="Disease"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
          </div>
        </div>

        <div class="flex justify-between mt-6 gap-4">
          <button
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-32"
            (click)="closePopup()"
          >
            Cancel
          </button>
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-32"
            (click)="addPatient()"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `
})
export class AddPatientComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Patient>();

  newPatient: Patient = {
    id: null,
    name: { first: '', last: '' },
    nss: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    assignedDoctor: '',
    disease: '',
    date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
  };

  closePopup() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  addPatient() {
    if (this.validatePatient()) {
      this.add.emit({ ...this.newPatient });
      this.closePopup();
    }
  }

  private validatePatient(): boolean {
    return !!(
      this.newPatient.name.first &&
      this.newPatient.name.last &&
      this.newPatient.nss &&
      this.newPatient.birthDate
    );
  }

  private resetForm() {
    this.newPatient = {
      id: null,
      name: { first: '', last: '' },
      nss: '',
      birthDate: '',
      phoneNumber: '',
      address: '',
      assignedDoctor: '',
      disease: '',
      date: new Date().toISOString().split('T')[0]
    };
  }
}
