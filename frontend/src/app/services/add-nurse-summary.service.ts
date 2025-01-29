import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddNurseSummaryService {
  private apiUrl = 'http://localhost:8000/api/soins-infirmiers/';

  constructor(private http: HttpClient) {}

  saveSummary(summaryData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, summaryData);
  }
}
