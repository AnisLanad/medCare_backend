import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import {Patient} from '../modals/patient.interface';
import {AddPatientComponent} from '../add-patient/add-patient.component';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [AddPatientComponent, FormsModule],
  template: `
    <div class="p-4 space-y-4">
      <!-- Header row with title and add button -->
      <div class="flex justify-between items-center">
        <h2 class="text-[70px] font-bold text-[#007BFF] font-['Plus_Jakarta_Sans']">Patient</h2>
        <button
          class="flex items-center justify-center gap-2.5 px-2.5 py-2.5 bg-[#007BFF] rounded-[10px] w-[187px]"
          (click)="showAddPatient()"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"
              fill="white"/>
          </svg>
          <span class="text-white font-['Inter'] text-[24px] font-medium leading-6">Add Patient</span>
        </button>
      </div>

      <!-- Search bar -->
      <div class="relative">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch($event)"
          placeholder="Search by name, ID, NSS"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] outline-none"
        />
      </div>

      <!-- Add Patient Modal -->
      <app-add-patient
        [isVisible]="isAddPatientVisible"
        (close)="hideAddPatient()"
        (add)="handleAddPatient($event)"
      ></app-add-patient>
    </div>
  `
})
export class SearchHeaderComponent {
  isAddPatientVisible = false;
  searchTerm: string = '';

  constructor(private patientService: PatientService) {}

  onSearch(term: string) {
    this.patientService.updateSearchTerm(term);
  }

  showAddPatient() {
    this.isAddPatientVisible = true;
  }

  hideAddPatient() {
    this.isAddPatientVisible = false;
  }

  handleAddPatient(patient: Patient) {
    this.patientService.addPatient(patient);
    this.hideAddPatient();
  }
}
