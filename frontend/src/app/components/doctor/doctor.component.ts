import { Component } from '@angular/core';
import {DoctorSearchHeaderComponent} from '@app/components/Header-dashboard/searchHeader-doctor.component';
import {DoctorListComponent} from '@app/components/patient-list/doctor-list.component';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    DoctorSearchHeaderComponent,
    DoctorListComponent
  ],
  template: `
    <div class="p-6">
      <app-doctor-search-header></app-doctor-search-header>
      <!---->
      <!-- Table Section -->
      <div class="mt-6 bg-white rounded-lg shadow">
        <app-doctor-list></app-doctor-list>
      </div>
    </div>
  `
})
export class DoctorComponent {}
