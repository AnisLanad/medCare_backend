import { Component } from '@angular/core';
import { NurseService } from '../../services/nurses.service'; // Import the NurseService
import { FormsModule } from '@angular/forms';
import { Nurse } from '../../services/nurses.service'; // Import the Nurse interface
import { AddNurseComponent } from '../add-patient/add-nurse.component'; // Import the AddNurseComponent

@Component({
  selector: 'app-nurse-search-header',
  standalone: true,
  imports: [AddNurseComponent, FormsModule], // Import necessary components
  template: `
    <div class="p-4 space-y-4">
      <!-- Header row with title and add button -->
      <div class="flex justify-between items-center">
        <h2 class="text-[70px] font-bold text-[#007BFF] font-['Plus_Jakarta_Sans']">Nurses</h2>
        <button
          class="flex items-center justify-center gap-2.5 px-2.5 py-2.5 bg-[#007BFF] rounded-[10px] w-[187px]"
          (click)="showAddNurse()"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"
              fill="white"/>
          </svg>
          <span class="text-white font-['Inter'] text-[24px] font-medium leading-6">Add Nurse</span>
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
          placeholder="Search by name, ID, phone, or email"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] outline-none"
        />
      </div>

      <!-- Add Nurse Modal -->
      <app-add-nurse
        [isVisible]="isAddNurseVisible"
        (close)="hideAddNurse()"
        (add)="handleAddNurse($event)"
      ></app-add-nurse>
    </div>
  `,
})
export class NurseSearchHeaderComponent {
  isAddNurseVisible = false;
  searchTerm: string = '';

  constructor(private nurseService: NurseService) {}

  onSearch(term: string) {
    this.nurseService.updateSearchTerm(term);
  }

  showAddNurse() {
    this.isAddNurseVisible = true;
  }

  hideAddNurse() {
    this.isAddNurseVisible = false;
  }

  // Updated handleAddNurse method
  handleAddNurse(newNurse: Nurse) {
    console.log('Nurse added successfully:', newNurse);
    this.hideAddNurse();
    // Optionally, you can trigger a refresh or update a list here if needed
  }
}
