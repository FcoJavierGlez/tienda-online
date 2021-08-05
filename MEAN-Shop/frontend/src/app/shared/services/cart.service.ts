import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { AppCookiesService } from './app-cookies.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly URL = 'http://localhost:3000/api/cart';
  private cart: Product[] = [];
  cart$ = new EventEmitter<Product[]>();

  constructor( private http: HttpClient, private cookiesSvc: AppCookiesService ) { }

  requestGetCart(token: string): void {
    this.http.get<Product[]>( this.URL, { headers: { authorization: `Bearer ${token}` } } ).subscribe(
      cart => {
        this.cart = cart;
        console.log('Carrito dentro de requestGetCart()',this.cart);
        this.cart$.emit( this.cart );
      }
    )
  }

  requestUpdateCart(token: string): void {
    this.http.put<Product[]>( this.URL, { cart: this.cart }, { headers: { authorization: `Bearer ${token}` } } ).subscribe(
      cart => console.log('Carrito dentro de requestGetCart()',cart)
    );
  }

  getCart(): Product[] {
    return this.cart;
  }

  addProduct(product: Product): void {
    const searchProduct = this.cart.find( e => e._id == product._id );
    if (!searchProduct) this.cart.push( product );
    else ++searchProduct.quantity;
    this.cart$.emit(this.cart);
    this.requestUpdateCart( this.cookiesSvc.getToken() );
  }

  resetCart(): void {
    this.cart = [];
    this.cart$.emit(this.cart);
  }

  emptyCart(): void {
    this.resetCart();
    //resetear en la API
  }

  /* addProduct = (cart, product) => {
    if (!cart.length) return cart.push( product );
    const searchProduct = cart.find( e => e._id == product._id );
    if (!searchProduct) return cart.push( product );
    ++searchProduct.quantity;
  }
  getTotalProducts = cart => {
      if (!cart.length) return 0;
      return cart.map( e => e.quantity ).reduce( (e, acc) => e + acc);
  }
  getTotalPrice = cart => {
      if (!cart.length) return 0;
      return cart.map( e => e.price * ( (100 - e.discount) / 100 ) * e.quantity ).reduce( (e, acc) => e + acc );
  } */
}
