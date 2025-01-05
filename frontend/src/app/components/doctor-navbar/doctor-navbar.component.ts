import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-doctor-navbar',
  imports: [CommonModule],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css',
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
          pointerEvents: 'none',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            pointerEvents: 'auto',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        }),
        animate(
          '200ms ease-in-out',
          style({
            opacity: 0,
            transform: 'translateY(-10px)',
            pointerEvents: 'none',
          })
        ),
      ]),
    ]),
  ],
})
export class DoctorNavbarComponent {
  nomPrenom: { Nom: string; Prenom: string } | null = null;
  constructor( private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.getUserName().subscribe((data) => {
      this.nomPrenom = data;
    });
  }
  
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

}
