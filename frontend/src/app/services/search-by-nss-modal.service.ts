import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchByNssModalService {
  private isSearchByNssModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isSearchByNssModalOpen.next(false);
  }
  openModal() {
    this.isSearchByNssModalOpen.next(true);
  }

  get isSearchByNssModalOpen$() {
    return this.isSearchByNssModalOpen.asObservable();
  }
  constructor() {}
}
