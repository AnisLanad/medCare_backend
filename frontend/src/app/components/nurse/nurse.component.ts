import { Component } from '@angular/core';
import { LabSearchHeaderComponent } from '@app/components/Header-dashboard/searchHeader-lab.component';
import { LabListComponent } from '@app/components/patient-list/lab-list.component';
import { NurseListComponent } from '@app/components/patient-list/nurse-list.component';
import { NurseSearchHeaderComponent } from '@app/components/Header-dashboard/searchHeader-nurse.component';

@Component({
  selector: 'app-nurse',
  standalone: true,
  imports: [NurseListComponent, NurseSearchHeaderComponent],
  template: `
    <div class="p-6">
      <app-nurse-search-header></app-nurse-search-header>
      <!---->
      <!-- Table Section -->
      <div class="mt-6 bg-white rounded-lg shadow">
        <app-nurse-list></app-nurse-list>
      </div>
    </div>
  `,
})
export class NurseComponent {}
