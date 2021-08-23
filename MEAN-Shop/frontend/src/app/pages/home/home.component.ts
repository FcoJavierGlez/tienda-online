import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { SuggestProductsService } from 'src/app/shared/services/suggest-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bargain!: Product;
  books!: Product[];
  films!: Product[];
  new!: Product[];

  private bargain$!: any;
  private books$!: any;
  private films$!: any;
  private new$!: any;

  constructor( 
    private cookiesSvc: AppCookiesService, 
    private cartSvc: CartService,
    private suggestSvc: SuggestProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if ( !this.cookiesSvc.checkLogin() ) {
      this.cartSvc.resetCart();
      // return;
    }
    this.bargain$ = this.suggestSvc.getBargain().subscribe( product => this.bargain = product );
    this.books$ = this.suggestSvc.getBooks().subscribe( products => this.books = products );
    this.films$ = this.suggestSvc.getFilms().subscribe( products => this.films = products );
    this.new$ = this.suggestSvc.getNew().subscribe( products => this.new = products );
  }

  ngOnDestroy(): void {
    this.bargain$?.unsubscribe();
    this.books$?.unsubscribe();
    this.films$?.unsubscribe();
    this.new$?.unsubscribe();
  }

  goTo(route: string): void {
    this.router.navigateByUrl( `/products?s=${route}` );
  }
  goToProduct(product: Product): void {
    this.router.navigateByUrl( `/product/${product._id}` );
  }

}
