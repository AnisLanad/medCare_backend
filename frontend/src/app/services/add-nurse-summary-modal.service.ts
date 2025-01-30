import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NurseDetailsModalService {
  private isAddSummaryModalOpen = new BehaviorSubject<boolean>(false);
  private patientIDSubject = new BehaviorSubject<number | null>(null); // Holds the selected patientID

  closeModal() {
    this.isAddSummaryModalOpen.next(false);
    this.patientIDSubject.next(null);
  }
  openModal(patientID: number) { 
    this.patientIDSubject.next(patientID);
    this.isAddSummaryModalOpen.next(true);
  }

  get isAddSummaryModalOpen$() {
    return this.isAddSummaryModalOpen.asObservable();
  }
  get patientID$() {
    return this.patientIDSubject.asObservable(); // Observable to retrieve patientID
  }
  constructor() {}
}
