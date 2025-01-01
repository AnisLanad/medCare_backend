import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchByQrCodeModalService {
  private isSearchByQrCodeModalOpen = new BehaviorSubject<boolean>(false);
  closeModal() {
    this.isSearchByQrCodeModalOpen.next(false);
  }
  openModal() {
    this.isSearchByQrCodeModalOpen.next(true);
  }

  get isSearchByQrCodeModalOpen$() {
    return this.isSearchByQrCodeModalOpen.asObservable();
  }
  constructor() {}
}
