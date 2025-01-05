import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddAssessmentModalService {
  private isAddAssessmentModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isAddAssessmentModalOpen.next(false);
  }
  openModal() {
    this.isAddAssessmentModalOpen.next(true);
  }

  get isAddAssessmentModalOpen$() {
    return this.isAddAssessmentModalOpen.asObservable();
  }
  constructor() {}
}
