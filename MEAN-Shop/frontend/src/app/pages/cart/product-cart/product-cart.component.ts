import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input() product!: Product;
  
  constructor( 
    private router: Router,
    private cartSvc: CartService
  ) { }

  ngOnInit(): void {
  }

  goToProduct(): void {
    this.router.navigateByUrl(`/product/${this.product._id}`);
  }

  getSalePrice(): number {
    return ( this.product.price * (100 - this.product.discount) / 100 );
  }

  incProduct(): void {
    this.cartSvc.addProduct( this.product );
  }
  decProduct(): void {
    this.cartSvc.decrementProduct( this.product );
  }
  removeProduct(): void {
    this.cartSvc.removeProduct( this.product );
  }

}
