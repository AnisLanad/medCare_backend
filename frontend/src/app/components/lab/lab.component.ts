import { Component } from '@angular/core';
import { TColumn } from '../../types/column.type';
import { DynamicTableComponent } from '../lab_table/dynamic-table.component';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Tpatient } from '../../types/patient2.type';


@Component({
  selector: 'app-lab',
  imports: [DynamicTableComponent, FormsModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
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

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    // Fetch patients data from the service
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        // Map the fetched data to Tpatient structure
        this.patients = patients.map((patient) => ({
          id: patient.id!,
          firstName: patient.name.first,
          lastName: patient.name.last,
          birthDate: patient.birthDate,
          nss: patient.nss!,
        }));
        this.filteredPatients = [...this.patients]; // Initialize filtered patients
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      },
    });
  }

  filterPatients(): void {
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
