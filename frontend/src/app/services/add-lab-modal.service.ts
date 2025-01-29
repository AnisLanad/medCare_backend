import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root',
})
export class AddPrescriptionModalService {
  private isAddPrescriptionModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isAddPrescriptionModalOpen.next(false);
  }
  openModal() {
    this.isAddPrescriptionModalOpen.next(true);
    console.log('Modal service triggered');
  }

  get isAddPrescriptionModalOpen$() {
    return this.isAddPrescriptionModalOpen.asObservable();
  }
  constructor() {}
}
