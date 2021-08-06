import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input() product!: Product;
  
  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToProduct(): void {
    this.router.navigateByUrl(`/product/${this.product._id}`);
  }

  getTotalPrice(): number {
    return ( this.product.price * (100 - this.product.discount) / 100 ) * this.product.quantity;
  }

}
