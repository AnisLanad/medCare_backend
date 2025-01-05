import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError, tap, combineLatest } from 'rxjs';

export interface Lab {
  id: number;
  Nom: string;
  Prenom: string;
  Telephone: string;
  Email: string;
  MotDePasse?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LabService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private labsSubject = new BehaviorSubject<Lab[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  // Create a filtered labs observable
  filteredLabs$ = combineLatest([
    this.labsSubject,
    this.searchTermSubject
  ]).pipe(
    map(([labs, searchTerm]) => {
      if (!searchTerm.trim()) {
        return labs;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      return labs.filter(lab =>
        lab.id.toString().includes(searchLower) ||
        lab.Nom.toLowerCase().includes(searchLower) ||
        lab.Prenom.toLowerCase().includes(searchLower) ||
        lab.Telephone.toLowerCase().includes(searchLower) ||
        lab.Email.toLowerCase().includes(searchLower)
      );
    })
  );

  constructor(private http: HttpClient) {
    this.loadLabs();
  }

  private loadLabs(): void {
    this.http.get<Lab[]>(`${this.apiUrl}/laborantins/`)
      .pipe(
        tap(response => console.log('API Response:', response)),
        catchError(error => {
          console.error('Error loading labs:', error);
          return throwError(() => error);
        })
      )
      .subscribe(labs => {
        console.log('Labs loaded:', labs);
        this.labsSubject.next(labs);
      });
  }

  addLab(lab: Lab): Observable<Lab> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<Lab>(`${this.apiUrl}/laborantins/`, lab, { headers }).pipe(
      map(newLab => {
        const currentLabs = this.labsSubject.value;
        this.labsSubject.next([...currentLabs, newLab]);
        return newLab;
      }),
      catchError(error => {
        console.error('Error adding lab:', error.error);
        return throwError(() => error);
      })
    );
  }

  updateLab(id: number, lab: Lab): Observable<Lab> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.put<Lab>(`${this.apiUrl}/laborantins/${id}/`, lab, { headers }).pipe(
      tap(response => console.log('Success response:', response)),
      map(updatedLab => {
        const currentLabs = this.labsSubject.value;
        const updatedLabs = currentLabs.map(l => (l.id === id ? updatedLab : l));
        this.labsSubject.next(updatedLabs);
        return updatedLab;
      }),
      catchError(error => {
        console.error('Detailed error:', JSON.stringify(error.error, null, 2));
        return throwError(() => error);
      })
    );
  }

  // Update getLabs to return filtered results instead of all labs
  getLabs(): Observable<Lab[]> {
    return this.filteredLabs$;
  }

  deleteLab(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/laborantins/${id}`).pipe(
      tap(() => {
        const currentLabs = this.labsSubject.value;
        const updatedLabs = currentLabs.filter(lab => lab.id !== id);
        this.labsSubject.next(updatedLabs);
      }),
      catchError(error => {
        console.error('Error deleting lab:', error);
        return throwError(() => error);
      })
    );
  }

  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
