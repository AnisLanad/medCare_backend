import { Injectable } from '@angular/core';
import { Tpatient } from '../../types/patient.type';
import { BehaviorSubject } from 'rxjs';
import { Tsummary } from '../../types/summary.type';

@Injectable({
  providedIn: 'root',
})
export class SearchedPatientService {
  private SearchedPatient = new BehaviorSubject<Tpatient | null>(null);
  get SearchedPatient$() {
    return this.SearchedPatient.asObservable();
  }
  setSearchedPatient(patient: Tpatient) {
    this.SearchedPatient.next(patient);
  }
  private patientSummary = new BehaviorSubject<Tsummary[]>([]);
  get patientSummary$() {
    return this.patientSummary.asObservable();
  }
  setPatientSummary(patientSummary: any) {
    this.patientSummary.next(patientSummary);
  }

  patientPrescriptions = new BehaviorSubject<any>(null);
  get patientPrescriptions$() {
    return this.patientPrescriptions.asObservable();
  }
  setPatientPrescriptions(patientPrescriptions: any) {
    this.patientPrescriptions.next(patientPrescriptions);
  }

  patientAssessment = new BehaviorSubject<any>(null);
  get patientAssessments$() {
    return this.patientAssessment.asObservable();
  }
  setPatientAssessments(patientAssessment: any) {
    this.patientAssessment.next(patientAssessment);
  }
  constructor() {}
}
