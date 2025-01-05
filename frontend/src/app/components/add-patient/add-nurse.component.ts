// add-nurse.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseService, Nurse } from '../../services/nurses.service';

@Component({
  selector: 'app-add-nurse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6">
        <h2 class="text-2xl font-semibold text-blue-600 text-center mb-6">
          Add New Nurse
        </h2>

        <!-- Form Fields -->
        <div class="space-y-4">
          <!-- First and Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="firstName" class="text-sm text-gray-600 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                [(ngModel)]="newNurse.Prenom"
                placeholder="First Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                [(ngModel)]="newNurse.Nom"
                placeholder="Last Name"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Phone and Email -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="phoneNumber" class="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                [(ngModel)]="newNurse.Telephone"
                placeholder="Phone number"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-sm text-gray-600 mb-1">Email</label>
              <input
                id="email"
                type="email"
                [(ngModel)]="newNurse.Email"
                placeholder="Email address"
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label for="password" class="text-sm text-gray-600 mb-1">Password</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="newNurse.MotDePasse"
              placeholder="Password"
              class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between mt-6 gap-4">
          <button
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-32"
            (click)="closePopup()"
          >
            Cancel
          </button>
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-32"
            (click)="addNurse()"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AddNurseComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Nurse>();

  newNurse: Nurse = {
    id: 0, // ID will be assigned by the server
    Nom: '',
    Prenom: '',
    Telephone: '',
    Email: '',
    MotDePasse: '',
  };

  constructor(private nurseService: NurseService) {}

  closePopup() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validateNurse(): boolean {
    const { Nom, Prenom, Email, Telephone, MotDePasse } = this.newNurse;

    if (!Nom || !Prenom || !Email || !Telephone || !MotDePasse) {
      console.log('Validation failed: required fields are missing');
      alert('Please fill in all required fields');
      return false;
    }

    if (!this.validateEmail(Email)) {
      console.log('Validation failed: invalid email format');
      alert('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(Telephone.replace(/\D/g, ''))) {
      console.log('Validation failed: invalid phone number');
      alert('Please enter a valid phone number');
      return false;
    }

    return true;
  }

  addNurse() {
    if (this.validateNurse()) {
      this.nurseService.addNurse(this.newNurse).subscribe({
        next: (addedNurse) => {
          console.log('Nurse added successfully:', addedNurse);
          this.add.emit(addedNurse); // Emit the added nurse
          this.closePopup();
        },
        error: (error) => {
          console.error('Error adding nurse:', error.error);
          alert('Failed to add nurse. Please check the input values.');
        },
      });
    }
  }

  private resetForm() {
    this.newNurse = {
      id: 0,
      Nom: '',
      Prenom: '',
      Telephone: '',
      Email: '',
      MotDePasse: '',
    };
  }
}
