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
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      if (this.loginForm.valid) {
        const email = this.loginForm.get('email')?.value as string;
        const password = this.loginForm.get('password')?.value as string;
        if (email.endsWith('@patient.com') && password == 'patient123') {
          this.router.navigate(['/patient']);
        } else if (email.endsWith('@nurse.com') && password == 'nurse123') {
          this.router.navigate(['/nurse']);
        } else if (email.endsWith('@doctor.com') && password == 'doctor123') {
          this.router.navigate(['/home']);
        } else if (email.endsWith('@lab.com') && password == 'lab123') {
          this.router.navigate(['/lab']);
        } else if (email.endsWith('@admin.com') && password == 'admin123') {
          this.router.navigate(['/admin']);
        }
        this.loading = false;
      }
    }, 2000);
  }
}
