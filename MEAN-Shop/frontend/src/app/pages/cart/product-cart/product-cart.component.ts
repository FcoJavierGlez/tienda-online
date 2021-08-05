import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input() product!: Product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
