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
    { key: 'DPI_ID', label: 'DPI ID' },
    { key: 'Nom', label: 'First Name' },
    { key: 'Prenom', label: 'Last Name' },
    { key: 'Adresse', label: 'Address' },
    { key: 'Email', label: 'Email' },
    { key: 'Telephone', label: 'Phone' },
    { key: 'DateNaissance', label: 'Birth Date' },
    { key: 'NSS', label: 'NSS' },
    { key: 'DateMaj', label: 'DateMaj' },
    { key: 'mutuelle_display', label: 'Mutuelle' },
    { key: 'NumPerCont', label: 'NumPerCont' },
    { key: 'age', label: 'Age' },
    { key: 'Mutuelle', label: 'Mutuelle' },
  ];

  patients: Tpatient[] = [];
  filteredPatients: Tpatient[] = [];
  searchText = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getMedecinPatients().subscribe(
      (data) => {
        this.patients = data;

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
        patient.Nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        patient.Prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        patient.NSS.toLowerCase().includes(this.searchText.toLowerCase()) ||
        patient.DPI_ID.toString().includes(this.searchText)
      );
    });
  }

  action(data: Tpatient) {
    alert(JSON.stringify(data));
  }
}
