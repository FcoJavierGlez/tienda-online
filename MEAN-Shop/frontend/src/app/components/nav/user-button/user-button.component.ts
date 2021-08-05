import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent implements OnInit {

  @Input() login!: boolean;

  constructor( 
    private router: Router, 
    private appCookiesSvc: AppCookiesService,
    private cartSvc: CartService
  ) { }

  ngOnInit(): void {
  }

  goTo(route: string): void {
    this.router.navigate( [`${route}`] );
  }

  logout(): void {
    this.appCookiesSvc.logout();
    this.cartSvc.resetCart();
    this.router.navigate( ['/'] );
  }

}
