import { Component } from '@angular/core';
import { TColumn } from '../../types/column.type';
import { Tpatient } from '../../types/patient.type';
import { DynamicTableComponent } from '../nurse_dynamic-table/dynamic-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  imports: [DynamicTableComponent, FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent {


  patientsColumns: TColumn<Tpatient>[] = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'nss', label: 'NSS' },
  ];
  patients: Tpatient[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1985-03-12',
      nss: '123-45-6789',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1990-07-22',
      nss: '234-56-7890',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      birthDate: '1978-11-15',
      nss: '345-67-8901',
    },
    {
      id: 4,
      firstName: 'Robert',
      lastName: 'Brown',
      birthDate: '1988-05-30',
      nss: '456-78-9012',
    },
    {
      id: 5,
      firstName: 'Emily',
      lastName: 'Davis',
      birthDate: '1995-01-08',
      nss: '567-89-0123',
    },
    {
      id: 6,
      firstName: 'Michael',
      lastName: 'Wilson',
      birthDate: '1992-02-20',
      nss: '678-90-1234',
    },
    {
      id: 7,
      firstName: 'Sarah',
      lastName: 'Taylor',
      birthDate: '1986-09-10',
      nss: '789-01-2345',
    },
    {
      id: 8,
      firstName: 'William',
      lastName: 'Anderson',
      birthDate: '1991-04-05',
      nss: '890-12-3456',
    },
    {
      id: 9,
      firstName: 'Olivia',
      lastName: 'Moore',
      birthDate: '2000-12-12',
      nss: '901-23-4567',
    },
    {
      id: 10,
      firstName: 'Ethan',
      lastName: 'Jackson',
      birthDate: '1999-06-18',
      nss: '123-34-5678',
    },
    // Repeat similar realistic entries for the next 50 patients
  ];
  filteredPatients: Tpatient[] = [...this.patients];
  searchText = '';
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
