import { Component, OnInit } from '@angular/core';
import { MedicalRecordModalService } from '../../services/medical-record-modal.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MedicalRecordModalComponent } from '../modals/medical-record-modal/medical-record-modal.component';
import { SearchByNssService } from '@app/services/searchByNss/search-by-nss.service';

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, MedicalRecordModalComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css',
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
          pointerEvents: 'none',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            pointerEvents: 'auto',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 0,
            transform: 'translateY(-10px)',
            pointerEvents: 'none',
          })
        ),
      ]),
    ]),
  ],
})
export class PatientDashboardComponent implements OnInit {
  constructor(
    private medicalRecordModalService: MedicalRecordModalService,
    private searchByNssService: SearchByNssService
  ) {}
  openMedicalRecordModal() {
    this.medicalRecordModalService.openModal();
  }
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit(): void {
    this.searchByNssService.searchByNss('123456789012').subscribe((data) => {
      console.log(data);
    });
  }
}
