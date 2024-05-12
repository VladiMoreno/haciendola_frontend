import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/env.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getProductsByUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${environment.apiUrl}products/get-products-by-user`, { headers : { 'Authorization' : `Bearer ${token}` },});
  }

  addProduct(body: Object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${environment.apiUrl}products/add`, body, { headers : { 'Authorization' : `Bearer ${token}` }});
  }

  updateProduct(body: Object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${environment.apiUrl}products/update`, body, { headers : { 'Authorization' : `Bearer ${token}` }});
  }

  removeProduct(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${environment.apiUrl}products/${id}`, { headers : { 'Authorization' : `Bearer ${token}` }});
  }
}