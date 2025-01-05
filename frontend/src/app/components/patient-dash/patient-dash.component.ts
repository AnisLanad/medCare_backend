import {Component} from '@angular/core';
import {PatientListComponent} from '@app/components/patient-list/patient-list.component';
import {SearchHeaderComponent} from '@app/components/Header-dashboard/SearchHeader.component';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    PatientListComponent,
    SearchHeaderComponent,

  ],
  template: `
    <div class="p-6">
      <app-search-header></app-search-header>
      <!---->
      <!-- Table Section -->
      <div class="mt-6 bg-white rounded-lg shadow">
        <app-patient-list></app-patient-list>
      </div>
    </div>
  `
})
export class PatientComponent {}
