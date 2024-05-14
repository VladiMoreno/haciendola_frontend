import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  @ViewChild('recoverPassword') model: ElementRef | undefined;
  showError: boolean;
  showSuccess: boolean;
  errors: any;
  form: any = {
    username: null,
    password: null
  };

  recoverPasswordForm : any  ={
    username : null,
    pin: null,
    newPassword: null,
    repeatNewPassword : null,
    pinCorrect : false
  };

  constructor(private authService: AuthService, private router: Router){
    this.showError = false;
    this.showSuccess = false;
    this.errors = null;
  }

  onLogin() {
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

  openModel(){
    const model = document.getElementById("recoverPassword");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel(){
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onVerifyPIN(form: NgForm) {
    const { username, pin } = this.recoverPasswordForm;

    const usernameSave: string = username;
    const pinSave: string = pin;

    this.authService.verifyPIN(username, pin).subscribe({
      next: (value) => {
        this.recoverPasswordForm.pinCorrect = true;
        form.resetForm();
        form.controls['recoverPasswordUsername'].setValue(usernameSave)
        form.controls['recoverPasswordUsername'].disable();
        form.controls['pin'].setValue(pinSave)
        form.controls['pin'].disable();
      },
      error: (err) => {
        this.errors = err.error['message'];
        this.showError = true;
      },
    });
  }

  onChangePassword() {
    const { username, pin, newPassword, repeatNewPassword } = this.recoverPasswordForm;

    this.authService.changePassword(username, pin, newPassword, repeatNewPassword).subscribe({
      next: (value) => {
        this.closeModel();
      },
      error: (err) => {
        this.errors = err.error['message'];
        this.showError = true;
      },
    });
  }
}