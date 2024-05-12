import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showError: boolean;
  showSuccess: boolean;
  errors: any;
  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private router: Router){
    this.showError = false;
    this.showSuccess = false;
    this.errors = null;
  }

  async onLogin() {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (value) => {
        const { data } = value;
        localStorage.setItem('token', data['token']);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.errors = err.error['message'];
        this.showError = true;
      },
    });
  }
}