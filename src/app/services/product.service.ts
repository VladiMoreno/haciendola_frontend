import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://api.example.com/products'; // URL de la API de productos

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('Productos obtenidos')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  // Método para agregar un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product)
      .pipe(
        tap((newProduct: Product) => console.log(`Producto agregado: ${newProduct.name}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  // Método para actualizar un producto existente
  updateProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put(url, product)
      .pipe(
        tap(_ => console.log(`Producto actualizado: ${product.name}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  // Método para eliminar un producto
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Product>(url)
      .pipe(
        tap(_ => console.log(`Producto eliminado con id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  // Manejo de errores HTTP
  private handleError<T>(operation = 'operación', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} falló: ${error.message}`);
      return of(result as T);
    };
  }
}
