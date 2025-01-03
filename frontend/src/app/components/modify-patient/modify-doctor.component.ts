import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../services/doctor.service';

@Component({
  selector: 'app-modify-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ doctor.id ? 'Edit Doctor' : 'Add Doctor' }}
        </h2>

        <form (ngSubmit)="onSubmit()" #form="ngForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium">First Name</label>
              <input
                type="text"
                [(ngModel)]="editedDoctor.name.first"
                name="firstName"
                required
                class="w-full p-2 border rounded"
              >
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                [(ngModel)]="editedDoctor.name.last"
                name="lastName"
                required
                class="w-full p-2 border rounded"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Specialty</label>
            <select
              [(ngModel)]="editedDoctor.specialty"
              name="specialty"
              required
              class="w-full p-2 border rounded"
            >
              <option value="GEN">General Medicine</option>
              <option value="CARD">Cardiology</option>
              <option value="DERM">Dermatology</option>
              <option value="PEDI">Pediatrics</option>
              <!-- Add more specialties as needed -->
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              [(ngModel)]="editedDoctor.phoneNumber"
              name="phoneNumber"
              required
              class="w-full p-2 border rounded"
            >
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Email</label>
            <input
              type="email"
              [(ngModel)]="editedDoctor.email"
              name="email"
              required
              class="w-full p-2 border rounded"
            >
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button
              type="button"
              (click)="close.emit()"
              class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!form.valid"
              class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ModifyDoctorComponent {
  @Input() doctor!: Doctor;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Doctor>();

  editedDoctor!: Doctor;

  ngOnInit() {
    this.editedDoctor = {
      ...this.doctor,
      name: { ...this.doctor.name }
    };
  }

  onSubmit() {
    // Update specialty display based on selected specialty
    const specialtyMap: { [key: string]: string } = {
      'GEN': 'Médecin généraliste',
      'CARD': 'Cardiologue',
      'DERM': 'Dermatologue',
      'PEDI': 'Pédiatre'
    };

    this.editedDoctor.specialtyDisplay = specialtyMap[this.editedDoctor.specialty] || this.editedDoctor.specialty;

    this.save.emit(this.editedDoctor);
  }
}
