import { QueryList } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { PreviewImageComponent } from './preview-image/preview-image.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  private idProduct!: string;
  product!: Product;

  private imageSelected!: number;

  private route$!: any;
  private product$!: any;

  @ViewChildren(PreviewImageComponent) childrens!: QueryList<PreviewImageComponent>;

  constructor( 
    private searchSvc: SearchService, 
    private appCookiesSvc: AppCookiesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route$ = this.router.params
                    .subscribe( param => {
                      this.idProduct = param['id'];
                      this.product$ = this.searchSvc.getProduct( this.idProduct ).subscribe(
                        productDB =>  {
                          this.product = productDB;
                          this.imageSelected = 0;
                        } 
                      )
                    });
    
  }

  ngOnDestroy(): void {
    this.route$.unsubscribe();
    this.product$.unsubscribe();
  }

  getProduct(): Product {
    return this.product;
  }

  getImage(): string {
    return this.product.images[ this.imageSelected ];
  }

  changePhoto(src: string): void {
    this.childrens.toArray()[this.imageSelected].activated = false;
    this.imageSelected = this.product.images.indexOf( src );
  }

  buyNow(): void {
    if ( !this.appCookiesSvc.checkLogin() ) return;
    this.addToCart();
    console.log('Comprar');
    
  }

  addToCart(): void {
    if ( !this.appCookiesSvc.checkLogin() ) return;
    console.log('Añadir al carrito');
  }
}
