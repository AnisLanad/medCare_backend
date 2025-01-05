import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, throwError, of, tap, combineLatest} from 'rxjs';
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
    this.http.get<any[]>(`${this.apiUrl}/patients/`) // Utilisez `any[]` si la structure exacte varie.
      .pipe(
        map(apiPatients => {
          console.log('Raw API response:', apiPatients); // Log de debug
          return apiPatients.map(p => this.mapApiToPatient(p));
        }),
        catchError(error => {
          console.error('Error loading patients:', error);
          return throwError(() => error);
        })
      )
      .subscribe(patients => {
        this.patientsSubject.next(patients);
      });
  }

  addPatient(patient: Patient): Observable<Patient> {
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    };

    const apiPayload = {
      data: {
        type: 'Patient',
        id: patient.id || null,
        attributes: {
          DPI_ID: patient.id || null,
          Nom: patient.name.last,
          Prenom: patient.name.first,
          DateNaissance: patient.birthDate,
          Adresse: patient.address || '',
          Telephone: patient.phoneNumber || '',
          NSS: patient.nss,
          Mutuelle: patient.insurance || 'CNAS',
          mutuelle_display: patient.insuranceDisplay || 'Cnas',
          NumPerCont: patient.emergencyContact || '',
          DateMaj: patient.birthDate,
          age: patient.age || null
        }
      }
    };

    return this.http.post<any>(`http://127.0.0.1:8000/api/patients/`, apiPayload, { headers })
      .pipe(
        map(response => {
          // Si la réponse est vide ou null, on retourne le patient original
          if (!response) {
            console.log('Empty response from server, using original patient data');
            return patient;
          }
          const newPatient = this.mapApiToPatient(response);
          const currentPatients = this.patientsSubject.value;
          this.patientsSubject.next([...currentPatients, newPatient]);
          return newPatient;
        }),
        catchError(error => {
          // Si c'est une erreur 500 mais que l'ajout a réussi
          if (error.status === 500) {
            console.log('Server error but patient might have been added, using original data');
            const currentPatients = this.patientsSubject.value;
            this.patientsSubject.next([...currentPatients, patient]);
            return of(patient); // Retourne le patient original
          }
          console.error('Add patient error:', error);
          return throwError(() => error);
        })
      );
}


  private mapApiToPatient(apiData: any): Patient {
    return {
      id: apiData.DPI_ID,
      name: {
        first: apiData.Prenom,
        last: apiData.Nom
      },
      birthDate: apiData.DateNaissance,
      address: apiData.Adresse,
      phoneNumber: apiData.Telephone,
      nss: apiData.NSS,
      insurance: apiData.Mutuelle,
      insuranceDisplay: apiData.mutuelle_display,
      emergencyContact: apiData.NumPerCont,
      lastUpdated: apiData.DateMaj,
      age: apiData.age,
    };
  }

  filteredPatients$ = combineLatest([
    this.patientsSubject,
    this.searchTermSubject
  ]).pipe(
    map(([patients, searchTerm]) => {
      if (!searchTerm.trim()) {
        return patients;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      return patients.filter(patient =>
        patient.id?.toString().includes(searchLower) ||
        patient.name.first.toLowerCase().includes(searchLower) ||
        patient.name.last.toLowerCase().includes(searchLower) ||
        patient.phoneNumber?.toLowerCase().includes(searchLower) ||
        patient.nss?.toLowerCase().includes(searchLower) ||
        patient.insurance?.toLowerCase().includes(searchLower) ||
        patient.address?.toLowerCase().includes(searchLower) ||
        patient.emergencyContact?.toLowerCase().includes(searchLower)
      );
    })
  );

  // Update getPatients to return filtered results
  getPatients(): Observable<Patient[]> {
    return this.filteredPatients$;
  }


  deletePatient(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete<void>(`http://127.0.0.1:8000/api/patients/${id}`, { headers }).pipe(
      tap(() => {
        const currentPatients = this.patientsSubject.value;
        const updatedPatients = currentPatients.filter(patient => patient.id !== id);
        this.patientsSubject.next(updatedPatients);
      }),
      catchError(error => {
        console.error('Error deleting patient:', error);
        return throwError(() => error);
      })
    );
  }


  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    });

    const patientId = patient.id?.toString();

    const apiPayload = {
      data: {
        type: 'Patient',
        id: patientId,
        attributes: {
          DPI_ID: patientId,
          Nom: patient.name.last,
          Prenom: patient.name.first,
          DateNaissance: patient.birthDate,
          Adresse: patient.address || '',
          Telephone: patient.phoneNumber || '',
          NSS: patient.nss,
          Mutuelle: patient.insurance || 'CNAS',
          mutuelle_display: patient.insuranceDisplay || 'Cnas',
          NumPerCont: patient.emergencyContact || '',
          DateMaj: new Date().toISOString().split('T')[0],
          age: patient.age
        }
      }
    };

    // Mettre à jour immédiatement le subject avec les nouvelles données
    const currentPatients = this.patientsSubject.value;
    const updatedPatients = currentPatients.map(p =>
      p.id === patient.id ? patient : p
    );
    this.patientsSubject.next(updatedPatients);

    return this.http.put<any>(
      `${this.apiUrl}/patients/${patientId}/`,
      apiPayload,
      {
        headers,
        observe: 'response'
      }
    ).pipe(
      tap(response => {
        // Log pour debug
        console.log('Server response:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          // Si on a une réponse valide du serveur, on met à jour avec les données du serveur
          const serverPatient = this.mapApiToPatient(response.body.data);
          const latestPatients = this.patientsSubject.value;
          const refreshedPatients = latestPatients.map(p =>
            p.id === serverPatient.id ? serverPatient : p
          );
          this.patientsSubject.next(refreshedPatients);
          return serverPatient;
        }
        // Si pas de réponse valide, on garde les données locales
        return patient;
      }),
      catchError(error => {
        // En cas d'erreur, on revient aux données précédentes
        const previousPatients = currentPatients;
        this.patientsSubject.next(previousPatients);

        if (error.status === 409) {
          return throwError(() => new Error('Version conflict: The patient data may have been modified. Please refresh and try again.'));
        }
        return throwError(() => error);
      })
    );
  }

  // Ajout d'une méthode pour rafraîchir les données
  private fetchPatients() {
    return this.http.get<any>(`${this.apiUrl}/patients/`).pipe(
      map(response => {
        const patients = response.data.map(this.mapApiToPatient);
        this.patientsSubject.next(patients);
        return patients;
      })
    );
  }
}
