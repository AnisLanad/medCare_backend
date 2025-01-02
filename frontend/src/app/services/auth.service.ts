import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Ajoute cet import

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
          // Stocker les tokens dans le localStorage
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username); // Storer le role

          // Optionnel : Mettre en place un mécanisme pour vérifier l'expiration des tokens
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token); // Sauvegarde du token dans le localStorage
    this.tokenSubject.next(token); // Met à jour le token dans le service
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

  getUserRole() {
    const token = localStorage.getItem('role'); // Récupérer le token
    if (token) {
    }
    return token;
  }

  getUserName() {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const Name = this.http.get<{ Nom: string; Prenom: string }>(
      `http://127.0.0.1:8000/api/user/${username}/${role}/`
    );
    return Name;
  }

  getMedecinPatients() {
    const username = localStorage.getItem('username');
    const Patients = this.http.get<
      Array<{
        DPI_ID: number;
        Nom: string;
        Prenom: string;
        DateNaissance: string;
        NSS: string;
      }>
    >(
      `http://127.0.0.1:8000/api/medecin/${username}/patients/` // Utilisation des backticks pour l'URL
    );
    return Patients;
  }
  getNbConsultations() {
    const username = localStorage.getItem('username');
    const nbcons = this.http.get<{
      count: number;
      patient1: string;
      patient2: string;
    }>(`http://127.0.0.1:8000/api/medecin/${username}/nbcons/`);
    return nbcons;
  }
}
