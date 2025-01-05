import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordModalService {
  isMedicalRecordModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isMedicalRecordModalOpen.next(false);
  }
  openModal() {
    this.isMedicalRecordModalOpen.next(true);
  }

  get isMedicalRecordModalOpen$() {
    return this.isMedicalRecordModalOpen.asObservable();
  }
  constructor() {}
}
