import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit, OnChanges {

  @Input() login!: boolean;

  cart: Product[] = [];

  constructor( private cartSvc: CartService, private cookiesSvc: AppCookiesService ) { }

  ngOnInit(): void {
    this.cartSvc.cart$.subscribe(
      cart => {
        this.cart = cart;
      }
    );
    if (this.cookiesSvc.checkLogin()) this.cartSvc.requestGetCart( this.cookiesSvc.getToken() );
  }

  ngOnChanges():void {
    if ( !this.cookiesSvc.checkLogin() ) this.cartSvc.resetCart();
  }

  getTotalItems(): string {
    return this.formatTotalItems( this.cartSvc.getTotalItems() );
  }

  private formatTotalItems(totalItems: number): string {
    return totalItems >= 100 ? '+99' : `${totalItems}`;
  }

  cssTotalItems(): any {
    if (!this.cart.length) return { 'gt-0': false, 'lt-10': true }
    return {
      'gt-0': this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc) > 0,
      'lt-10': this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc) < 10,
      'geqt-10': this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc) >= 10 && this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc) < 100,
      'geqt-100': this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc) >= 100
    }
  }

}
