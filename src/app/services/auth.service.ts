import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() { }

  // Método para iniciar sesión
  login(email: string, password: string): boolean {
    // Aquí podrías realizar la lógica de autenticación, como enviar una solicitud HTTP al backend
    // para verificar las credenciales del usuario. Por ahora, simplemente simularemos una autenticación exitosa.
    if (email === 'admin@admin.com' && password === 'admin') {
      this.isLoggedIn = true;
      return true;
    } else {
      return false;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedIn = false;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
