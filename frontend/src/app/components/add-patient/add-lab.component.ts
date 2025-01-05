import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lab , LabService } from '../../services/lab.services';

@Component({
  selector: 'app-add-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6">
        <h2 class="text-2xl font-semibold text-blue-600 text-center mb-6">
          Add New Lab
        </h2>

        <form (ngSubmit)="onSubmit($event)" #form="ngForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="firstName" class="text-sm text-gray-600 mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                [(ngModel)]="newLab.Prenom"
                name="firstName"
                required
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                id="lastName"
                type="text"
                [(ngModel)]="newLab.Nom"
                name="lastName"
                required
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label for="phoneNumber" class="text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                [(ngModel)]="newLab.Telephone"
                name="phoneNumber"
                required
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
            <div class="flex flex-col">
              <label for="email" class="text-sm text-gray-600 mb-1">Email</label>
              <input
                id="email"
                type="email"
                [(ngModel)]="newLab.Email"
                name="email"
                required
                class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <div class="flex justify-between mt-6 gap-4">
            <button
              type="button"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-32"
              (click)="closePopup()"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!form.valid || isSubmitting"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-32"
            >
              {{ isSubmitting ? 'Adding...' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AddLabComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Lab>();

  newLab: Lab = {
    id: 0,
    Nom: '',
    Prenom: '',
    Telephone: '',
    Email: '',
    MotDePasse: '',
  };

  isSubmitting: boolean = false; // Flag to prevent duplicate submissions

  constructor(private labService: LabService) {}

  closePopup() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validateLab(): boolean {
    const { Nom, Prenom, Email, Telephone } = this.newLab;

    if (!Nom || !Prenom || !Email || !Telephone) {
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

// In AddLabComponent, modify the onSubmit method:
// In AddLabComponent
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted');

    if (this.isSubmitting) {
      console.log('Form is already submitting');
      return;
    }

    if (this.validateLab()) {
      // Instead of calling the service directly, just emit the new lab
      this.add.emit(this.newLab);
      this.closePopup();
    }
  }

  private resetForm() {
    this.newLab = {
      id: 0,
      Nom: '',
      Prenom: '',
      Telephone: '',
      Email: '',
      MotDePasse: '',
    };
  }
}
