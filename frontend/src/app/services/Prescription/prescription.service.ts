import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  BASE_URL = 'http://127.0.0.1:8000/api';
  createPrescription(data: any) {
    return this.http.post(`${this.BASE_URL}/ordonnances/`, data);
  }
  createTreatment(data: any) {
    return this.http.post(`${this.BASE_URL}/ordonnance-medicaments/`, data);
  }
  getPatientPrescriptions(patientId: number) {
    return this.http.get(
      `${this.BASE_URL}/consultations/${patientId}/by_patient/`
    );
  }
  constructor(private http: HttpClient) {}
}
