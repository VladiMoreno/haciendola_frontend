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
  form: any = {
    email: null,
    password: null
  };

  constructor(private authService: AuthService, private router: Router){
    this.showError = false;
    this.showSuccess = false;
  }

  onLogin(){
    const { email, password } = this.form;

    if(this.authService.login(email, password)){
      this.showSuccess = true;
      this.router.navigateByUrl('/dashboard');
    }else {
      this.showError = true;
    }
  }
}