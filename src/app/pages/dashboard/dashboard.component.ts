import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  @ViewChild('addProductModal') addProductModel: ElementRef | undefined;
  productObj: Product = new Product();
  addProductObj: AddProduct = new AddProduct();
  productList: Product[] = [];
  detailMode: boolean = false;

  constructor(private dashboardService : DashboardService, private authService: AuthService,private router: Router){}

  ngOnInit(): void {
      this.dashboardService.getProductsByUser().subscribe({
        next: (value) => {
          const { data } = value;
          const productList = data.map((item: any) => ({
            pk_product_id: item.pk_product_id,
            product_handle: item.product_handle,
            product_title: item.product_title,
            product_description: item.product_description,
            product_sku: item.product_sku,
            product_grams: item.product_grams,
            product_stock: item.product_stock,
            product_price: item.product_price,
            product_compare_price: item.product_compare_price,
            product_bar_code: item.product_bar_code
          }));
          this.productList = productList;
        },
        error: (err) => {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        },
      });
  }

  openAddProductModel(){
    const addProductModel = document.getElementById("addProductModal");
    if (addProductModel != null) {
      addProductModel.style.display = 'block'
    }
  }

  openModel(){
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel(){
    this.productObj = new Product();
    if(this.detailMode){
      this.detailMode = false;
    }
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  closeAddProductModel(){
    this.productObj = new Product();
    if (this.addProductModel != null) {
      this.addProductModel.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Product) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.productList.findIndex(m=> m.pk_product_id === this.productObj.pk_product_id);
      this.productList.splice(currentRecord,1);
      localStorage.setItem('products', JSON.stringify(this.productList));
    }
  }

  onEdit(item: Product) {
    this.productObj =  item;
    this.openModel();
  }

  onDetailMode(item: Product){
    this.productObj =  item;
    this.detailMode = true;
    this.openModel();
  }

  saveProduct(){

    this.dashboardService.addProduct(this.addProductObj).subscribe({
      next: (value) => {
        const { data } = value;
        const newProduct = new Product();

        newProduct.pk_product_id = data['pk_product_id'];
        newProduct.product_handle = this.addProductObj.product_handle;
        newProduct.product_title = this.addProductObj.product_title;
        newProduct.product_description = this.addProductObj.product_description;
        newProduct.product_sku = this.addProductObj.product_sku;
        newProduct.product_grams = this.addProductObj.product_grams;
        newProduct.product_stock = this.addProductObj.product_stock;
        newProduct.product_price = this.addProductObj.product_price;
        newProduct.product_compare_price = this.addProductObj.product_compare_price;
        newProduct.product_bar_code = this.addProductObj.product_bar_code;

        const newArr = this.productList;
        newArr.push(newProduct);
        this.productList = newArr;
        this.closeAddProductModel();
      },
      error: (err) => {
        console.log(err.error)
      },
    });
    this.closeAddProductModel()
  }

  updateProduct(){

    this.dashboardService.updateProduct(this.productObj).subscribe({
      next: (value) => {
        const currentRecord =  this.productList.find(m=> m.pk_product_id === this.productObj.pk_product_id);
        if(currentRecord != undefined) {
          currentRecord.product_handle = this.productObj.product_handle;
          currentRecord.product_title =  this.productObj.product_title;
          currentRecord.product_description =  this.productObj.product_description;

          currentRecord.product_sku = this.productObj.product_sku;
          currentRecord.product_grams =  this.productObj.product_grams;
          currentRecord.product_stock =  this.productObj.product_stock;

          currentRecord.product_price = this.productObj.product_price;
          currentRecord.product_compare_price =  this.productObj.product_compare_price;
          currentRecord.product_bar_code =  this.productObj.product_bar_code;
        }

        this.closeModel();
      },
      error: (err) => {
        console.log(err.error)
      },
    });

  }

}

export class Product{
  pk_product_id: number;
  product_handle: string;
  product_title: string;
  product_description: string;
  product_sku: number;
  product_grams: number;
  product_stock: number;
  product_price: number;
  product_compare_price: number;
  product_bar_code: string;

  constructor(){
    this.pk_product_id = 0;
    this.product_handle = '';
    this.product_title = '';
    this.product_description = '';
    this.product_sku = 0;
    this.product_grams = 0;
    this.product_stock = 0;
    this.product_price = 0.0;
    this.product_compare_price = 0.0;
    this.product_bar_code = '';
  }
}

export class AddProduct{
  product_handle: string;
  product_title: string;
  product_description: string;
  product_sku: number;
  product_grams: number;
  product_stock: number;
  product_price: number;
  product_compare_price: number;
  product_bar_code: string;

  constructor(){
    this.product_handle = '';
    this.product_title = '';
    this.product_description = '';
    this.product_sku = 0;
    this.product_grams = 0;
    this.product_stock = 0;
    this.product_price = 0.0;
    this.product_compare_price = 0.0;
    this.product_bar_code = '';
  }
}