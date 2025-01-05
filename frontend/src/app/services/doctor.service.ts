import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, throwError, of, tap, combineLatest} from 'rxjs';

// Define the Doctor interface
export interface Doctor {
  id: number | null;
  name: {
    first: string;
    last: string;
  };
  specialty: string;
  specialtyDisplay: string;
  phoneNumber: string;
  email: string;
  password?: string;
  patients?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private doctorsSubject = new BehaviorSubject<Doctor[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadDoctors();
  }

  private loadDoctors(): void {
    this.http.get<any[]>(`${this.apiUrl}/medecins/`)
      .pipe(
        //afficher les données dans la console
        tap(console.log),
        map(apiDoctors => {
          return apiDoctors.map(this.mapApiToDoctor);
        }),
        catchError(error => {
          console.error('Error loading doctors:', error);
          return throwError(() => error);
        })
      )
      .subscribe(doctors => {
        this.doctorsSubject.next(doctors);
      });
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Changed from vnd.api+json
      'Accept': 'application/json'
    });

    // Create the exact payload structure you need
    const apiPayload = {
      Medecin_ID: 2,  // Hardcoded for testing
      Nom: doctor.name.last,
      Prenom: doctor.name.first,
      Email: doctor.email,
      Specialite: doctor.specialty,
      Telephone: doctor.phoneNumber,
      patients: [3],  // Array with test patient ID
      specialite_display: doctor.specialty,
      MotDePasse: doctor.password,
    };

    return this.http.post<any>(`${this.apiUrl}/medecins/`, apiPayload, { headers }).pipe(
      map(response => {
        const newDoctor = this.mapApiToDoctor(response);
        const currentDoctors = this.doctorsSubject.value;
        this.doctorsSubject.next([...currentDoctors, newDoctor]);
        return newDoctor;
      }),
      catchError(error => {
        console.error('Error adding doctor:', error.error);
        return throwError(() => error);
      })
    );
  }


  updateDoctor(doctor: Doctor): Observable<Doctor> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    });

    const doctorId = doctor.id?.toString();

    const apiPayload = {
      data: {
        type: 'Medecin',
        id: doctorId,
        attributes: {
          Nom: doctor.name.last,
          Prenom: doctor.name.first,
          Specialite: doctor.specialty,
          specialite_display: doctor.specialtyDisplay,
          Telephone: doctor.phoneNumber,
          Email: doctor.email,
          MotDePasse: doctor.password || 'unchanged'
        },
        relationships: {
          patients: {
            data: doctor.patients || [], // Just pass the array of IDs
            meta: {
              count: doctor.patients?.length || 0
            }
          }
        }
      }
    };

    return this.http.put<any>(
      `${this.apiUrl}/medecins/${doctorId}/`,
      apiPayload,
      { headers }
    ).pipe(
      tap(response => console.log('Success response:', response)),
      map(response => {
        const updatedDoctor = this.mapApiToDoctor(response.data || response);
        const currentDoctors = this.doctorsSubject.value;
        const updatedDoctors = currentDoctors.map(d =>
          d.id === updatedDoctor.id ? updatedDoctor : d
        );
        this.doctorsSubject.next(updatedDoctors); // Update the BehaviorSubject
        return updatedDoctor;
      }),
      catchError(error => {
        console.error('Detailed error:', JSON.stringify(error.error, null, 2));
        return throwError(() => error);
      })
    );
  }
  // Add this method to help debug
  private logDoctorData(doctor: Doctor) {
    console.log('Doctor data being processed:', {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      phone: doctor.phoneNumber,
      email: doctor.email,
      patients: doctor.patients
    });
  }


  private mapApiToDoctor(apiData: any): Doctor {
    return {
      id: apiData.Medecin_ID,
      name: {
        first: apiData.Prenom,
        last: apiData.Nom
      },
      specialty: apiData.Specialite || 'N/A',
      specialtyDisplay: apiData.specialite_display || 'N/A',
      phoneNumber: apiData.Telephone,
      email: apiData.Email,
      patients: apiData.patients || []
    };
  }

  filteredDoctors$ = combineLatest([
    this.doctorsSubject,
    this.searchTermSubject
  ]).pipe(
    map(([doctors, searchTerm]) => {
      if (!searchTerm.trim()) {
        return doctors;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      return doctors.filter(doctor =>
        doctor.id?.toString().includes(searchLower) ||
        doctor.name.first.toLowerCase().includes(searchLower) ||
        doctor.name.last.toLowerCase().includes(searchLower) ||
        doctor.phoneNumber.toLowerCase().includes(searchLower) ||
        doctor.email.toLowerCase().includes(searchLower) ||
        doctor.specialty.toLowerCase().includes(searchLower)
      );
    })
  );

  // Update getDoctors to return filtered results
  getDoctors(): Observable<Doctor[]> {
    return this.filteredDoctors$;
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medecins/${id}`).pipe(
      tap(() => {
        const currentDoctors = this.doctorsSubject.value;
        const updatedDoctors = currentDoctors.filter(doctor => doctor.id !== id);
        this.doctorsSubject.next(updatedDoctors);
      }),
      catchError(error => {
        console.error('Error deleting doctor:', error);
        return throwError(() => error);
      })
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
