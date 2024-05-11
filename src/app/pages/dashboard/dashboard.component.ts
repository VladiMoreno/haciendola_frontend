import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  productObj: Product = new Product();
  productList: Product[] = [];
  detailMode: boolean = false;

  ngOnInit(): void {
      const localData = localStorage.getItem("products");
      if(localData != null){
        this.productList = JSON.parse(localData);
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

  onDelete(item: Product) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.productList.findIndex(m=> m.id === this.productObj.id);
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
    const isLocalPresent = localStorage.getItem("products");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.productObj.id = oldArray.length + 1;
      oldArray.push(this.productObj);
      this.productList = oldArray;
      localStorage.setItem('products', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.productObj);
      this.productObj.id = 1;
      this.productList = newArr;
      localStorage.setItem('products', JSON.stringify(newArr));
    }
    this.closeModel()
  }

  updateProduct(){

    const currentRecord =  this.productList.find(m=> m.id === this.productObj.id);
    if(currentRecord != undefined) {
      currentRecord.handle = this.productObj.handle;
      currentRecord.title =  this.productObj.title;
      currentRecord.description =  this.productObj.description;

      currentRecord.sku = this.productObj.sku;
      currentRecord.grams =  this.productObj.grams;
      currentRecord.stock =  this.productObj.stock;

      currentRecord.price = this.productObj.price;
      currentRecord.comparePrice =  this.productObj.comparePrice;
      currentRecord.barcode =  this.productObj.barcode;
    };
    localStorage.setItem('products', JSON.stringify(this.productList));
    this.closeModel()
  }

}

export class Product{
  id: number;
  handle: string;
  title: string;
  description: string;
  sku: number;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode: number;

  constructor(){
    this.id = 0;
    this.handle = '';
    this.title = '';
    this.description = '';
    this.sku = 0;
    this.grams = 0;
    this.stock = 0;
    this.price = 0.0;
    this.comparePrice = 0.0;
    this.barcode = 0;
  }
}