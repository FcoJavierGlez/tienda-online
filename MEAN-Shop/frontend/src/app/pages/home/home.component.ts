import { Component, OnInit } from '@angular/core';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private cookiesSvc: AppCookiesService, private cartSvc: CartService ) { }

  ngOnInit(): void {
    if ( !this.cookiesSvc.checkLogin() ) {
      this.cartSvc.resetCart();
      return;
    }
    this.cartSvc.requestGetCart( this.cookiesSvc.getToken() );
    
  }

}
