import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nurse } from '../../services/nurses.service'; // Import the updated Nurse interface

@Component({
  selector: 'app-modify-nurse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ nurse.id ? 'Edit Nurse' : 'Add Nurse' }}
        </h2>

        <form (ngSubmit)="onSubmit()" #form="ngForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium">First Name</label>
              <input
                type="text"
                [(ngModel)]="editedNurse.Prenom"
                name="firstName"
                required
                class="w-full p-2 border rounded"
              >
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                [(ngModel)]="editedNurse.Nom"
                name="lastName"
                required
                class="w-full p-2 border rounded"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              [(ngModel)]="editedNurse.Telephone"
              name="phoneNumber"
              required
              class="w-full p-2 border rounded"
            >
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium">Email</label>
            <input
              type="email"
              [(ngModel)]="editedNurse.Email"
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
  `,
})
export class ModifyNurseComponent {
  @Input() nurse!: Nurse; // Use the updated Nurse interface
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Nurse>();

  editedNurse!: Nurse;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nurse'] && this.nurse) {
      // Initialize editedNurse with the current nurse data
      this.editedNurse = { ...this.nurse };
    }
  }

  onSubmit() {
    console.log('Submitting nurse data:', this.editedNurse);
    this.save.emit(this.editedNurse);
  }
}
