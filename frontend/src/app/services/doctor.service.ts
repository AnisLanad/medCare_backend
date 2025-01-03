import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError, of, tap } from 'rxjs';

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
    this.http.get<any>(`${this.apiUrl}/doctors/`)
      .pipe(
        map(response => {
          console.log('Raw API response:', response);
          return Array.isArray(response) ? response.map(d => this.mapApiToDoctor(d)) :
            response.data ? [this.mapApiToDoctor(response.data)] : [];
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
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    };

    const apiPayload = {
      data: {
        type: 'Medecin',
        id: doctor.id || null,
        attributes: {
          Medecin_ID: doctor.id || null,
          Nom: doctor.name.last,
          Prenom: doctor.name.first,
          Specialite: doctor.specialty,
          specialite_display: doctor.specialtyDisplay,
          Telephone: doctor.phoneNumber,
          Email: doctor.email,
          MotDePasse: doctor.password
        },
        relationships: {
          patients: {
            data: doctor.patients || []
          }
        }
      }
    };

    return this.http.post<any>(`${this.apiUrl}/doctors/`, apiPayload, { headers })
      .pipe(
        map(response => {
          if (!response) {
            console.log('Empty response from server, using original doctor data');
            return doctor;
          }
          const newDoctor = this.mapApiToDoctor(response.data);
          const currentDoctors = this.doctorsSubject.value;
          this.doctorsSubject.next([...currentDoctors, newDoctor]);
          return newDoctor;
        }),
        catchError(error => {
          if (error.status === 500) {
            console.log('Server error but doctor might have been added, using original data');
            const currentDoctors = this.doctorsSubject.value;
            this.doctorsSubject.next([...currentDoctors, doctor]);
            return of(doctor);
          }
          console.error('Add doctor error:', error);
          return throwError(() => error);
        })
      );
  }

  private mapApiToDoctor(apiData: any): Doctor {
    return {
      id: apiData.attributes.Medecin_ID,
      name: {
        first: apiData.attributes.Prenom,
        last: apiData.attributes.Nom
      },
      specialty: apiData.attributes.Specialite,
      specialtyDisplay: apiData.attributes.specialite_display,
      phoneNumber: apiData.attributes.Telephone,
      email: apiData.attributes.Email,
      patients: apiData.relationships?.patients?.data || []
    };
  }

  getDoctors(): Observable<Doctor[]> {
    return this.doctorsSubject.asObservable();
  }

  deleteDoctor(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete<void>(`${this.apiUrl}/doctors/${id}`, { headers }).pipe(
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
          Medecin_ID: doctorId,
          Nom: doctor.name.last,
          Prenom: doctor.name.first,
          Specialite: doctor.specialty,
          specialite_display: doctor.specialtyDisplay,
          Telephone: doctor.phoneNumber,
          Email: doctor.email
        },
        relationships: {
          patients: {
            data: doctor.patients || []
          }
        }
      }
    };

    // Update the subject immediately with new data
    const currentDoctors = this.doctorsSubject.value;
    const updatedDoctors = currentDoctors.map(d =>
      d.id === doctor.id ? doctor : d
    );
    this.doctorsSubject.next(updatedDoctors);

    return this.http.put<any>(
      `${this.apiUrl}/doctors/${doctorId}/`,
      apiPayload,
      {
        headers,
        observe: 'response'
      }
    ).pipe(
      tap(response => {
        console.log('Server response:', response);
      }),
      map(response => {
        if (response.body && response.body.data) {
          const serverDoctor = this.mapApiToDoctor(response.body.data);
          const latestDoctors = this.doctorsSubject.value;
          const refreshedDoctors = latestDoctors.map(d =>
            d.id === serverDoctor.id ? serverDoctor : d
          );
          this.doctorsSubject.next(refreshedDoctors);
          return serverDoctor;
        }
        return doctor;
      }),
      catchError(error => {
        const previousDoctors = currentDoctors;
        this.doctorsSubject.next(previousDoctors);

        if (error.status === 409) {
          return throwError(() => new Error('Version conflict: The doctor data may have been modified. Please refresh and try again.'));
        }
        return throwError(() => error);
      })
    );
  }

  private fetchDoctors() {
    return this.http.get<any>(`${this.apiUrl}/doctors/`).pipe(
      map(response => {
        const doctors = Array.isArray(response.data)
          ? response.data.map(this.mapApiToDoctor)
          : [this.mapApiToDoctor(response.data)];
        this.doctorsSubject.next(doctors);
        return doctors;
      })
    );
  }
}
