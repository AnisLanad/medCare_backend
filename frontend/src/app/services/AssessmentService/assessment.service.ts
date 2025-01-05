import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'http://127.0.0.1:8000/api';
  addAssessment(data: any) {
    return this.http.post(`${this.BASE_URL}/bilans/`, data);
  }

  getPatientAssessments(DPI_ID: number) {
    return this.http.get(`${this.BASE_URL}/bilans/?Patient=${DPI_ID}`);
  }
}
