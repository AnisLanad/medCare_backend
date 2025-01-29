import { Injectable } from '@angular/core';
import { Tpatient } from '../../types/patient.type';
import { BehaviorSubject } from 'rxjs';
import { Tsummary } from '../../types/summary.type';
import { Tprescription } from '@app/types/prescription.type';
import { Tassessment } from '@app/types/assessment.type';

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
  setPatientSummary(patientSummary: Tsummary[]) {
    this.patientSummary.next(patientSummary);
  }

  patientPrescriptions = new BehaviorSubject<Tprescription[]>([]);
  get patientPrescriptions$() {
    return this.patientPrescriptions.asObservable();
  }
  setPatientPrescriptions(patientPrescriptions: Tprescription[]) {
    this.patientPrescriptions.next(patientPrescriptions);
  }

  patientAssessment = new BehaviorSubject<Tassessment[]>([]);
  get patientAssessments$() {
    return this.patientAssessment.asObservable();
  }
  setPatientAssessments(patientAssessment: Tassessment[]) {
    this.patientAssessment.next(patientAssessment);
  }
  constructor() {}
}
