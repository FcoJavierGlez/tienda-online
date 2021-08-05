import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {

  cart!: Product[];

  constructor( private cookiesSvc: AppCookiesService, private cartSvc: CartService ) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.cart = this.cartSvc.getCart();
  }

  ngOnDestroy(): void { }
    

}
