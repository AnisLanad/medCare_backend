import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  standalone: true,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Patient Management</h1>
      <p>Patient dashboard content goes here</p>
    </div>
  `
})
export class PatientComponent {}
