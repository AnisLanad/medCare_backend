import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tpatient } from '../../types/patient.type';

@Injectable({
  providedIn: 'root',
})
export class SearchByNssService {
  BASE_URL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}
  searchByNss(nss: string) {
    return this.http.get<Tpatient[]>(`${this.BASE_URL}/patients/?NSS=${nss}`);
  }
}
