import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
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
    private cartSvc: CartService,
    private appCookiesSvc: AppCookiesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  goToProduct(): void {
    this.router.navigateByUrl(`/product/${this.product._id}`);
  }

  getSalePrice(): number {
    return ( this.product.price * (100 - this.product.discount) / 100 );
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

  incProduct(): void {
    if ( !this.appCookiesSvc.checkLogin() ) this.messageLoggedIn();
    else this.cartSvc.addProduct( this.product );
  }
  decProduct(): void {
    if ( !this.appCookiesSvc.checkLogin() ) this.messageLoggedIn();
    else this.cartSvc.decrementProduct( this.product );
  }
  removeProduct(): void {
    if ( !this.appCookiesSvc.checkLogin() ) this.messageLoggedIn();
    else this.cartSvc.removeProduct( this.product );
  }

}
