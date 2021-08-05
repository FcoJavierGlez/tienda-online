import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit, DoCheck {

  @Input() login!: boolean;

  cart: Product[] = [];

  constructor( private cartSvc: CartService ) { }

  ngOnInit(): void {
    //console.log('Iniciado cart-button');
    this.cartSvc.cart$.subscribe(
      cart => {
        this.cart = cart;
      }
    )
  }

  ngDoCheck(): void {
    /* console.log('DoCheck cart-button', this.cart);
    console.log('DoCheck longitud carrito', this.cart.length); */
    //this.cartSvc.refreshCart();
  }

  getTotalItems(): string {
    if (!this.cart.length) return '0';
    const totalItems =  this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc);
    return this.formatTotalItems(totalItems);
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
