import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NursePatientModalService {
  private isPatientModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isPatientModalOpen.next(false);
  }
  openModal() {
    this.isPatientModalOpen.next(true);
  }

  get isPatientModalOpen$() {
    return this.isPatientModalOpen.asObservable();
  }
  constructor() {}
}
