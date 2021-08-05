import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, DoCheck, OnDestroy {

  search!: string;
  products!: Product[];

  constructor( 
    private params: ActivatedRoute, 
    private searchSvc: SearchService,
    private appCookiesSvc: AppCookiesService,
    private catSvc: CartService
  ) { }

  ngOnInit(): void { 
    if (!this.appCookiesSvc.checkLogin() ) this.catSvc.resetCart();
    this.params.queryParams.subscribe(
      param => {
        this.search = param['s'];
        this.searchSvc.search( this.search ).subscribe(
          data => this.products = data
        );
      }
    );
  }

  ngDoCheck(): void { }

  ngOnDestroy(): void { }

}
