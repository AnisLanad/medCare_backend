import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  BASE_URL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  addSummary(data: any) {
    return this.http.post(`${this.BASE_URL}/consultations/`, data);
  }

  getPatientSummaries(patientId: number) {
    return this.http.get(
      `${this.BASE_URL}/consultations/?Patient=${patientId}`
    );
  }
}
