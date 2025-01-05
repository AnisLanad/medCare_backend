import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../services/doctor.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6">
        <h2 class="text-2xl font-semibold text-blue-600 text-center mb-6">
          Add New Doctor
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="firstName" class="text-sm text-gray-600 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                [(ngModel)]="newDoctor.name.first"
                placeholder="First Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                [(ngModel)]="newDoctor.name.last"
                placeholder="Last Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex flex-col">
            <label for="specialty" class="text-sm text-gray-600 mb-1">Specialty</label>
            <select
              id="specialty"
              [(ngModel)]="newDoctor.specialty"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="GEN">General Medicine</option>
              <option value="CARD">Cardiology</option>
              <option value="DERM">Dermatology</option>
              <option value="PEDI">Pediatrics</option>
              <option value="NEUR">Neurology</option>
              <option value="PSYCH">Psychiatry</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="phoneNumber" class="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                [(ngModel)]="newDoctor.phoneNumber"
                placeholder="Phone number"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-sm text-gray-600 mb-1">Email</label>
              <input
                id="email"
                type="email"
                [(ngModel)]="newDoctor.email"
                placeholder="Email address"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex flex-col">
            <label for="password" class="text-sm text-gray-600 mb-1">Password</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="newDoctor.password"
              placeholder="Password"
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
            (click)="addDoctor()"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `
})
export class AddDoctorComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Doctor>();

  newDoctor: Doctor = {
    id: null,
    name: { first: '', last: '' },
    specialty: 'GEN',
    specialtyDisplay: 'Médecin généraliste',
    phoneNumber: '',
    email: '',
    password: '',
    patients: [] // Empty array of patient IDs
  };

  private specialtyMap: { [key: string]: string } = {
    'GEN': 'Médecin généraliste',
    'CARD': 'Cardiologue',
    'DERM': 'Dermatologue',
    'PEDI': 'Pédiatre',
    'NEUR': 'Neurologue',
    'PSYCH': 'Psychiatre'
  };

  constructor(private doctorService: DoctorService) {}

  closePopup() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validateDoctor(): boolean {
    // Check for required fields
    if (!this.newDoctor.name.first || !this.newDoctor.name.last || 
        !this.newDoctor.specialty || !this.newDoctor.email || 
        !this.newDoctor.password || !this.newDoctor.phoneNumber) {
      console.log('Validation failed: required fields are missing');
      alert('Please fill in all required fields');
      return false;
    }

    // Validate email format
    if (!this.validateEmail(this.newDoctor.email)) {
      console.log('Validation failed: invalid email format');
      alert('Please enter a valid email address');
      return false;
    }

    // Validate phone number (optional, adjust regex as needed)
    const phoneRegex = /^\d{8,}$/;  // At least 8 digits
    if (!phoneRegex.test(this.newDoctor.phoneNumber.replace(/\D/g, ''))) {
      console.log('Validation failed: invalid phone number');
      alert('Please enter a valid phone number');
      return false;
    }

    return true;
  }

  addDoctor() {
    if (this.validateDoctor()) {
      this.newDoctor.specialtyDisplay = this.specialtyMap[this.newDoctor.specialty];
  
      // Ensure password is provided
      if (!this.newDoctor.password) {
        this.newDoctor.password = 'password'; // Replace with actual password input
      }
  
      const doctorToAdd = {
        ...this.newDoctor,
        patients: []  // Empty array instead of [1]
      };
  
      console.log('Submitting doctor:', doctorToAdd);
  
      this.doctorService.addDoctor(doctorToAdd).subscribe({
        next: (addedDoctor) => {
          console.log('Doctor added successfully:', addedDoctor);
          this.add.emit(addedDoctor);
          this.closePopup();
        },
        error: (error) => {
          console.error('Error adding doctor:', error.error);
          alert('Failed to add doctor. Please check the input values.');
        }
      });
    }
  }

  private resetForm() {
    this.newDoctor = {
      id: null,
      name: { first: '', last: '' },
      specialty: 'GEN',
      specialtyDisplay: 'Médecin généraliste',
      phoneNumber: '',
      email: '',
      password: '',
      patients: []  // Empty array instead of [1]
    };
  }
}
