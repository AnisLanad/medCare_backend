import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NursingCare } from '../models/nursing-care.model';

@Injectable({
  providedIn: 'root', // This ensures the service is available app-wide
})
export class NursingCareService {
  private apiUrl = 'http://127.0.0.1:8000/api/soins-infirmiers/';

  constructor(private http: HttpClient) {}

  createNursingCare(data: NursingCare): Observable<NursingCare> {
    return this.http.post<NursingCare>(this.apiUrl, data);
  }
}
