import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Patient } from '../components/modals/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadPatients();
  }

  private loadPatients(): void {
    this.http.get<Array<{
      DPI_ID: number;
      Nom: string;
      Prenom: string;
      DateNaissance: string;
      NSS: string;
    }>>(`${this.apiUrl}/patients/`)
      .pipe(
        map(apiPatients => apiPatients.map(p => this.mapApiToPatient(p)))
      )
      .subscribe(patients => {
        this.patientsSubject.next(patients);
      });
  }

  private mapApiToPatient(apiPatient: {
    DPI_ID: number;
    Nom: string;
    Prenom: string;
    DateNaissance: string;
    NSS: string;
  }): Patient {
    return {
      id: apiPatient.DPI_ID,
      name: {
        first: apiPatient.Prenom,
        last: apiPatient.Nom
      },
      birthDate: apiPatient.DateNaissance,
      nss: apiPatient.NSS,
      assignedDoctor: '', // Default value
      date: new Date().toISOString().split('T')[0], // Current date as default
      disease: '', // Default value
      phoneNumber: '', // Default value
      address: '' // Default value
    };
  }

  getPatients(): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${id}`).pipe(
      map(() => {
        const currentPatients = this.patientsSubject.value;
        const updatedPatients = currentPatients.filter(patient => patient.id !== id);
        this.patientsSubject.next(updatedPatients);
      })
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const apiPatient = {
      DPI_ID: patient.id,
      Nom: patient.name.last,
      Prenom: patient.name.first,
      DateNaissance: patient.birthDate,
      NSS: patient.nss
    };

    if (patient.id === null) {
      // Create new patient
      return this.http.post<any>(`${this.apiUrl}/patients/`, apiPatient).pipe(
        map(response => {
          const newPatient = this.mapApiToPatient(response);
          const currentPatients = this.patientsSubject.value;
          this.patientsSubject.next([...currentPatients, newPatient]);
          return newPatient;
        })
      );
    } else {
      // Update existing patient
      return this.http.put<any>(`${this.apiUrl}/patients/${patient.id}`, apiPatient).pipe(
        map(response => {
          const updatedPatient = this.mapApiToPatient(response);
          const currentPatients = this.patientsSubject.value;
          const updatedPatients = currentPatients.map(p =>
            p.id === updatedPatient.id ? updatedPatient : p
          );
          this.patientsSubject.next(updatedPatients);
          return updatedPatient;
        })
      );
    }
  }
}
