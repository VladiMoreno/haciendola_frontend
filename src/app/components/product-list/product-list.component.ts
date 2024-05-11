import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Cargar la lista de productos al inicializar el componente
    this.loadProducts();
  }

  loadProducts(): void {
    // Obtener la lista de productos desde el servicio
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(productId: number): void {
    // Redirigir a la página de edición de producto
    // Podrías pasar el id del producto como parámetro en la URL
    // Por ejemplo: this.router.navigate(['/products', productId, 'edit']);
  }

  deleteProduct(productId: number): void {
    // Eliminar el producto utilizando el servicio
    this.productService.deleteProduct(productId).subscribe(() => {
      // Volver a cargar la lista de productos después de eliminar
      this.loadProducts();
    });
  }
}
