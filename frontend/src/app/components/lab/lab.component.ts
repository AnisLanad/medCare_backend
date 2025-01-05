import { Component } from '@angular/core';
import {LabSearchHeaderComponent} from '@app/components/Header-dashboard/searchHeader-lab.component';
import {LabListComponent} from '@app/components/patient-list/lab-list.component';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [
    LabSearchHeaderComponent,
    LabListComponent
  ],
  template: `
    <div class="p-6">
      <app-lab-search-header></app-lab-search-header>
      <!---->
      <!-- Table Section -->
      <div class="mt-6 bg-white rounded-lg shadow">
        <app-lab-list></app-lab-list>
      </div>
    </div>
  `
})
export class LabComponent {}
