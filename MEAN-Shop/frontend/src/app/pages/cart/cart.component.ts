import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
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

  constructor( 
    private cookiesSvc: AppCookiesService, 
    private cartSvc: CartService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.cart = this.cartSvc.getCart();
  }

  private messageLoggedIn(): void {
    let messageLoggedInDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Debe iniciar sesión',
        message: 'Parece que la sesión de su cuenta ha caducado. Debe iniciar sesión para poder realizar esta acción.',
        alertMessage: false,
        continueMessage: false,
        optionButtons: false
      }
    });
    messageLoggedInDialog.afterClosed().subscribe( () => this.router.navigate( ['/login'] ) );
  }
    
  getTotalPrice(): number {
    if (!this.cart.length) return 0;
    return this.cart.map( e => e.price * ( (100 - e.discount) / 100 ) * e.quantity ).reduce( (e, acc) => e + acc );
  }

  getTotalProducts(): number {
    return this.cart.map( e => e.quantity ).reduce( (e, acc) => e + acc);
  }

  emptyCart(): void {
    if ( !this.cookiesSvc.checkLogin() ) this.messageLoggedIn();
    else this.cartSvc.emptyCart();
  }

  goToOrder(): void {
    this.router.navigate(['/order']);
  }
}
