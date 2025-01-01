import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Import du service AuthService
import { Router } from '@angular/router';
import {   HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule  // Nécessaire pour HttpClient
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 // Ajoutez ceci si le composant est autonome
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.email, // Vérifiez si vous utilisez "username" ou "email"
        password: this.loginForm.value.password
      };
      console.log('Données envoyées au backend:', loginData);

      this.authService.login(loginData).subscribe(
        (response:any ) => {
          // Sauvegarder le token dans le service
          this.authService.saveToken(response.access);  // Sauvegarde du token
          const role = this.authService.getUserRole();
          console.log(role)
          if (role === 'medecin') {
            this.router.navigate(['/home']);
          } else if (role === 'patient') {
            this.router.navigate(['/home']);
          }
          console.log('Login successful');

          
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
