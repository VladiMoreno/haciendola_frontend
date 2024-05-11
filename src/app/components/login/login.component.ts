import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Autenticación exitosa, redirige a la página de productos
      this.router.navigate(['/products']);
    } else {
      // Autenticación fallida, mostrar mensaje de error o manejar de otra manera
      console.log('Error de autenticación');
    }
  }
}
