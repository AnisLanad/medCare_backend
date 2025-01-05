import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, throwError, tap, combineLatest} from 'rxjs';

// Define interfaces to match API structure
export interface Nurse {
  id: number;
  Nom: string;
  Prenom: string;
  Telephone: string;
  Email: string;
  MotDePasse?: string; // Optional, if used for creating/updating nurses
}

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private nursesSubject = new BehaviorSubject<Nurse[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadNurses();
  }

  private loadNurses(): void {
    this.http.get<Nurse[]>(`${this.apiUrl}/infirmiers/`)
      .pipe(
        tap(response => console.log('API Response:', response)),
        catchError(error => {
          console.error('Error loading nurses:', error);
          return throwError(() => error);
        })
      )
      .subscribe(nurses => {
        console.log('Nurses loaded:', nurses);
        this.nursesSubject.next(nurses);
      });
  }


  addNurse(nurse: Nurse): Observable<Nurse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<Nurse>(`${this.apiUrl}/infirmiers/`, nurse, { headers }).pipe(
      map(newNurse => {
        const currentNurses = this.nursesSubject.value;
        this.nursesSubject.next([...currentNurses, newNurse]);
        return newNurse;
      }),
      catchError(error => {
        console.error('Error adding nurse:', error.error);
        return throwError(() => error);
      })
    );
  }

  updateNurse(id: number, nurse: Nurse): Observable<Nurse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.put<Nurse>(`${this.apiUrl}/infirmiers/${id}/`, nurse, { headers }).pipe(
      tap(response => console.log('Success response:', response)),
      map(updatedNurse => {
        const currentNurses = this.nursesSubject.value;
        const updatedNurses = currentNurses.map(n => (n.id === id ? updatedNurse : n));
        this.nursesSubject.next(updatedNurses);
        return updatedNurse;
      }),
      catchError(error => {
        console.error('Detailed error:', JSON.stringify(error.error, null, 2));
        return throwError(() => error);
      })
    );
  }

  filteredNurses$ = combineLatest([
    this.nursesSubject,
    this.searchTermSubject
  ]).pipe(
    map(([nurses, searchTerm]) => {
      if (!searchTerm.trim()) {
        return nurses;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      return nurses.filter(nurse =>
        nurse.id.toString().includes(searchLower) ||
        nurse.Nom.toLowerCase().includes(searchLower) ||
        nurse.Prenom.toLowerCase().includes(searchLower) ||
        nurse.Telephone.toLowerCase().includes(searchLower) ||
        nurse.Email.toLowerCase().includes(searchLower)
      );
    })
  );

  // Update getNurses to return filtered results
  getNurses(): Observable<Nurse[]> {
    return this.filteredNurses$;
  }

  deleteNurse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/infirmiers/${id}`).pipe(
      tap(() => {
        const currentNurses = this.nursesSubject.value;
        const updatedNurses = currentNurses.filter(nurse => nurse.id !== id);
        this.nursesSubject.next(updatedNurses);
      }),
      catchError(error => {
        console.error('Error deleting nurse:', error);
        return throwError(() => error);
      })
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
