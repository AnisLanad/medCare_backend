import { Component } from '@angular/core';
import { TColumn } from '../../types/column.type';
import { DynamicTableComponent } from '../lab_table/dynamic-table.component';
import { FormsModule } from '@angular/forms';
import { Tpharmacist } from '../../types/pharmacist.type';


@Component({
  selector: 'app-lab',
  imports: [DynamicTableComponent, FormsModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
})
export class PatientsComponent {


  patientsColumns: TColumn<Tpharmacist>[] = [
    { key: 'id', label: 'ID' },
    { key: 'prescreption', label: 'test' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'patient', label: 'Patient' },
    { key: 'date', label: 'Date' },
  ];
  prescreptions: Tpharmacist[] = [
    {
      id: 1,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 2,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 3,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 4,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 5,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 6,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    {
      id: 7,
      prescreption: 'Lexin',
      doctor: 'John',
      patient: 'Amal',
      date: '1985-03-12',
    },
    
    // Repeat similar realistic entries for the next 50 patients
  ];
  filteredPrescreptions: Tpharmacist[] = [...this.prescreptions];
  searchText = '';
  filterPatients() {
    if (this.searchText === '') {
      this.filteredPrescreptions = [...this.prescreptions];
      return;
    }
    this.filteredPrescreptions = this.prescreptions.filter((prescreption__) => {
      return (
        prescreption__.doctor
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        prescreption__.patient
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        prescreption__.prescreption.toLowerCase().includes(this.searchText.toLowerCase()) ||
        prescreption__.id.toString().includes(this.searchText)
      );
    });
  }
  action(data: Tpharmacist) {
    
    alert(JSON.stringify(data));
  }
}
