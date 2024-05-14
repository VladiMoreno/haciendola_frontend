import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/env.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any> {

    return this.http.post(`${environment.apiUrl}auth/login`,{
      "username" : username,
      "password" : password,
    });
  }

  verifyPIN(username: string, pin: string): Observable<any> {

    return this.http.post(`${environment.apiUrl}auth/validar-pin`,{
      "username" : username,
      "pin" : pin,
    });
  }

  changePassword(username: string, pin: string, newPassword : string, repeatNewPassword: string): Observable<any> {

    return this.http.post(`${environment.apiUrl}auth/change-password`,{
      "username" : username,
      "pin" : pin,
      "newPassword": newPassword,
      "repeatNewPassword": repeatNewPassword
    });
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
