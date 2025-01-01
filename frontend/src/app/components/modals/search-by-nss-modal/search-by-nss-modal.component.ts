import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchByNssModalService } from '../../../services/search-by-nss-modal.service';
import { fadeInOut } from '../../../animations/animations';

@Component({
  selector: 'app-search-by-nss-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-by-nss-modal.component.html',
  styleUrl: './search-by-nss-modal.component.css',
  animations: [fadeInOut],
})
export class SearchByNssModalComponent implements OnInit {
  isOpen = false;
  searchForm: FormGroup;
  constructor(
    private searchByNssModalService: SearchByNssModalService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      nss: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.searchByNssModalService.isSearchByNssModalOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }
  closeModal() {
    this.searchByNssModalService.closeModal();
  }
  onSubmit() {
    if (this.searchForm.valid) {
      console.log('Form submitted:', this.searchForm.value);
    }
  }
}
