import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddSummaryModalService {
  private isAddSummaryModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isAddSummaryModalOpen.next(false);
  }
  openModal() {
    this.isAddSummaryModalOpen.next(true);
  }

  get isAddSummaryModalOpen$() {
    return this.isAddSummaryModalOpen.asObservable();
  }
  constructor() {}
}
