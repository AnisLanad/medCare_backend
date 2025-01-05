import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Ajoute cet import
import { Tpatient } from '../types/patient.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http
      .post(`http://127.0.0.1:8000/api/token/`, loginData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response: any) => {
          // Store tokens and other details in localStorage
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token); // Save token in localStorage
    this.tokenSubject.next(token); // Update token in the service
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }

  setAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('role');
    return role;
  }

  getUserName(): Observable<{ Nom: string; Prenom: string }> {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    return this.http.get<{ Nom: string; Prenom: string }>(
      `http://127.0.0.1:8000/api/user/${username}/${role}/`
    );
  }

  getMedecinPatients(): Observable<Array<Tpatient>> {
    const username = localStorage.getItem('username');
    return this.http.get<Array<Tpatient>>(
      `http://127.0.0.1:8000/api/medecin/${username}/patients/`
    );
  }

  getAllPatients(): Observable<
    Array<{
      DPI_ID: number;
      Nom: string;
      Prenom: string;
      DateNaissance: string;
      NSS: string;
    }>
  > {
    return this.http.get<
      Array<{
        DPI_ID: number;
        Nom: string;
        Prenom: string;
        DateNaissance: string;
        NSS: string;
      }>
    >(`http://127.0.0.1:8000/api/patients/`);
  }

  getNbConsultations(): Observable<{
    count: number;
    patient1: string;
    patient2: string;
  }> {
    const username = localStorage.getItem('username');
    return this.http.get<{
      count: number;
      patient1: string;
      patient2: string;
    }>(`http://127.0.0.1:8000/api/medecin/${username}/nbcons/`);
  }
}
