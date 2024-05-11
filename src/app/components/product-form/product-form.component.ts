import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: 0, name: '', description: '', price: 0 };
  isNew: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isNew = false;
      // Cargar el producto existente para su edición
      // Esto podría ser una solicitud HTTP al backend para obtener los detalles del producto
      // Aquí se simula cargar un producto con datos predefinidos
      this.product = { id: productId, name: 'Producto existente', description: 'Descripción del producto', price: 100 };
    }
  }

  onSubmit(): void {
    if (this.isNew) {
      // Agregar un nuevo producto
      this.productService.addProduct(this.product).subscribe(() => {
        // Redirigir a la lista de productos después de agregar el nuevo producto
        this.router.navigate(['/products']);
      });
    } else {
      // Actualizar el producto existente
      this.productService.updateProduct(this.product).subscribe(() => {
        // Redirigir a la lista de productos después de actualizar el producto
        this.router.navigate(['/products']);
      });
    }
  }
}
