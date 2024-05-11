import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // El usuario está autenticado, permite el acceso
    } else {
      // El usuario no está autenticado, redirige a la pantalla de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
