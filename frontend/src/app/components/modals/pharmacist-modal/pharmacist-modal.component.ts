import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchByNssModalService } from '../../../services/pharmacist-modal.service';
import { fadeInOut } from '../../../animations/animations';

@Component({
  selector: 'app-pharmacist-modal',
  imports: [CommonModule],
  templateUrl: './pharmacist-modal.component.html',
  styleUrls: ['./pharmacist-modal.component.css'],
  animations: [fadeInOut],
})
export class SearchByNssModalComponent implements OnInit {
  isOpen = false;
  patientInfo = {
    doctorFirstName: 'Boulacheb',
    doctorLastName: 'Boulacheb',
    patientFirstName: 'Hichem',
    patientLastName: 'Hichem',
    treatment: 'Lexin 100mg',
  };

  constructor(private searchByNssModalService: SearchByNssModalService) {}

  ngOnInit(): void {
    this.searchByNssModalService.isSearchByNssModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  closeModal() {
    this.searchByNssModalService.closeModal();
  }

  handleAction(isValid: boolean) {
    console.log('Action:', isValid);
    this.closeModal();
  }
}
