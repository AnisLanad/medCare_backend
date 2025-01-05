import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchByNssModalComponent } from '../modals/search-by-nss-modal/search-by-nss-modal.component';
import { SearchByNssModalService } from '../../services/search-by-nss-modal.service';
import { SearchByQrCodeModalComponent } from '../modals/search-by-qr-code-modal/search-by-qr-code-modal.component';
import { SearchByQrCodeModalService } from '../../services/search-by-qr-code-modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SearchByNssModalComponent,
    SearchByQrCodeModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  nombre_cons: number = 0; // Déclarez avec le type approprié et une valeur par défaut.
  nomPrenom: { Nom: string; Prenom: string } | null = null;
  pat1: string = '';
  pat2: string = '';
  today: string = new Date().toLocaleDateString('en-CA');

  constructor(
    private searchByNssModalService: SearchByNssModalService,
    private searchByQrCodeModalService: SearchByQrCodeModalService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Si getNbConsultations retourne un Observable :
    this.authService.getUserName().subscribe((data) => {
      this.nomPrenom = data;
    });

    this.authService.getNbConsultations().subscribe(
      (data) => {
        this.nombre_cons = data.count;
        this.pat1 = data.patient1;
        this.pat2 = data.patient2; // Affecter la valeur à nombre_cons.
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des consultations :',
          error
        );
      }
    );
  }

  openSearchByNssModal() {
    this.searchByNssModalService.openModal();
  }
  openSearchByQrCodeModal() {
    this.searchByQrCodeModalService.openModal();
  }
}
