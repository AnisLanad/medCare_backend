import { Component } from '@angular/core';
import { TColumn } from '../../types/column.type';
import { Tpatient } from '../../types/patient.type';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patients',
  imports: [DynamicTableComponent, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'], // Correction ici
})
export class PatientsComponent {
  patientsColumns: TColumn<Tpatient>[] = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'nss', label: 'NSS' },
  ];

  patients: Tpatient[] = [];
  filteredPatients: Tpatient[] = [];
  searchText = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getMedecinPatients().subscribe(
      (data) => {
        this.patients = data.map((patient) => ({
          id: patient.DPI_ID,
          firstName: patient.Prenom,
          lastName: patient.Nom,
          birthDate: patient.DateNaissance,
          nss: patient.NSS,
        }));

        // Mettre à jour filteredPatients
        this.filteredPatients = [...this.patients];

        console.log('Patients:', this.patients);
      },
      (error) => {
        console.error('Erreur lors de la récupération des patients:', error);
      }
    );
  }

  filterPatients() {
    if (this.searchText === '') {
      this.filteredPatients = [...this.patients];
      return;
    }
    this.filteredPatients = this.patients.filter((patient) => {
      return (
        patient.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        patient.lastName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        patient.nss.toLowerCase().includes(this.searchText.toLowerCase()) ||
        patient.id.toString().includes(this.searchText)
      );
    });
  }

  action(data: Tpatient) {
    alert(JSON.stringify(data));
  }
}
