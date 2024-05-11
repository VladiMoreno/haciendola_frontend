import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // Método para iniciar sesión
  login(email: string, password: string): boolean {
    // Aquí podrías realizar la lógica de autenticación, como enviar una solicitud HTTP al backend
    // para verificar las credenciales del usuario. Por ahora, simplemente simularemos una autenticación exitosa.
    if (email === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem('token', "MI-TOKEN-BIEN-CHIDORI");
      return true;
    } else {
      return false;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }
}
