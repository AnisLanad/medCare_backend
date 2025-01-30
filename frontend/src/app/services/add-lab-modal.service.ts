import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root',
})
export class AddPrescriptionModalService {
  private isAddPrescriptionModalOpen = new BehaviorSubject<boolean>(false);
  private patientIDSubject = new BehaviorSubject<number | null>(null); // Holds the selected patientID

  closeModal() {
    this.isAddPrescriptionModalOpen.next(false);
    this.patientIDSubject.next(null); // Reset after closing
  } 
  openModal(patientID: number) {
    this.patientIDSubject.next(patientID);  // Store patientID
    this.isAddPrescriptionModalOpen.next(true);
    console.log('Modal service triggered');
  }

  get isAddPrescriptionModalOpen$() {
    return this.isAddPrescriptionModalOpen.asObservable();
  }
  get patientID$() {
    return this.patientIDSubject.asObservable(); // Observable to retrieve patientID
  }
  constructor() {}
}
