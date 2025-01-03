import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../modals/patient.interface';

@Component({
  selector: 'app-modify-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6">
        <h2 class="text-2xl font-semibold text-blue-600 text-center mb-6">
          Modify Patient
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="firstName" class="text-sm text-gray-600 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                [(ngModel)]="patient.name.first"
                placeholder="First Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                [(ngModel)]="patient.name.last"
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
              [(ngModel)]="patient.nss"
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
                [(ngModel)]="patient.birthDate"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="phoneNumber" class="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                [(ngModel)]="patient.phoneNumber"
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
              [(ngModel)]="patient.address"
              placeholder="Address"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="insurance" class="text-sm text-gray-600 mb-1">Insurance</label>
              <select
                id="insurance"
                [(ngModel)]="patient.insurance"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="CNAS">CNAS</option>
                <option value="CASNOS">CASNOS</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="emergencyContact" class="text-sm text-gray-600 mb-1">Emergency Contact</label>
              <input
                id="emergencyContact"
                type="tel"
                [(ngModel)]="patient.emergencyContact"
                placeholder="Emergency contact number"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
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
            (click)="applyChanges()"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  `
})
export class ModifyPatientComponent {
  @Input() patient: Patient = {
    id: null,
    name: { first: '', last: '' },
    nss: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    insurance: 'CNAS',
    insuranceDisplay: 'Cnas',  // Ajout de la valeur par défaut
    emergencyContact: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    age: null
  };

  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Patient>();

  closePopup() {
    this.isVisible = false;
    this.close.emit();
  }

  calculateAge(birthDate: string): number {
    if (!birthDate) return 20;
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }

  applyChanges() {
    if (this.validatePatient()) {
      // Créer une copie du patient avec les bonnes propriétés
      const updatedPatient = {
        ...this.patient,
        age: this.calculateAge(this.patient.birthDate),
        insuranceDisplay: this.patient.insurance === 'CNAS' ? 'Cnas' : this.patient.insurance,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      this.save.emit(updatedPatient);
      this.closePopup();
    }
  }

  private validatePatient(): boolean {
    return !!(
      this.patient.name.first &&
      this.patient.name.last &&
      this.patient.nss &&
      this.patient.birthDate &&
      this.patient.insurance
    );
  }
}
