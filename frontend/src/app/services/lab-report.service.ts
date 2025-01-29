import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class LabReportService {
  private apiUrl = 'http://localhost:8000/api/lab_report/';

  constructor(private http: HttpClient) {}

  saveReport(reportData: any): Observable<any> {
    return this.http.post(this.apiUrl, reportData);
  }
}
