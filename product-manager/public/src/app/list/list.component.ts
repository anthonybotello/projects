import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
products;
  constructor(private httpService: HttpService) { 
    this.allProducts();
  }

  ngOnInit() {
  }

  allProducts(){
    this.httpService.getAll()
      .subscribe(products => this.products = products);
  }
  deleteProduct(id:string){
    this.httpService.delete(id);
    this.allProducts();
  }
  priceDisplay(price:string){
    return parseFloat(price).toFixed(2);
  }
}
