import { QueryList } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { SuggestProductsService } from 'src/app/shared/services/suggest-products.service';
import { PreviewImageComponent } from './preview-image/preview-image.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  private idProduct!: string;
  product!: Product;
  productsWithSameTag: Product[] = [];
  cart: Product[] = [];

  private imageSelected!: number;

  shwImgZoom: boolean = false;
  imageZoom: boolean = false;

  private route$!: any;
  private product$!: any;
  private suggestProduct$!: any;

  @ViewChildren(PreviewImageComponent) childrens!: QueryList<PreviewImageComponent>;

  addedCart: boolean = false;

  constructor( 
    private searchSvc: SearchService, 
    private suggestProductSvc: SuggestProductsService,
    private appCookiesSvc: AppCookiesService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private cartSvc: CartService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route$ = this.activatedRouter.params
                    .subscribe( param => {
                      this.idProduct = param['id'];

                      this.product$ = this.searchSvc.getProduct( this.idProduct ).subscribe(
                        productDB =>  {
                          this.product = productDB;
                          this.imageSelected = 0;
                        } 
                      );

                      this.suggestProduct$ = this.suggestProductSvc
                      .getProductsWithSameTag( this.idProduct ).subscribe(
                        productsList => this.productsWithSameTag = productsList
                      );
                    });
    
  }

  ngOnDestroy(): void {
    this.route$.unsubscribe();
    this.product$.unsubscribe();
    this.suggestProduct$.unsubscribe();
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

  toggleShowImg(): void {
    this.shwImgZoom = !this.shwImgZoom;
    this.imageZoom = false;
  }
  toggleZoom(): void {
    this.imageZoom = !this.imageZoom;
  }
  urlImgZoom(): any {
    return {
      'backgroundImage': `url(${this.getImage()})`
    }
  }

  private messageLoggedIn(): void {
    let messageLoggedInDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Debe iniciar sesión',
        message: 'Debe iniciar sesión para poder realizar esta acción.',
        alertMessage: false,
        continueMessage: false,
        optionButtons: false
      }
    });
    messageLoggedInDialog.afterClosed().subscribe( () => this.router.navigate( ['/login'] ) );
  }

  buyNow(): void {
    if ( !this.appCookiesSvc.checkLogin() ) this.messageLoggedIn();
    else {
      this.addToCart();
      //pasar a tramitar el pedido
    }
  }

  addToCart(): void {
    if ( !this.appCookiesSvc.checkLogin() ) this.messageLoggedIn();
    else {
      this.addedCart = true;
      this.cartSvc.addProduct( this.product );
      this.cart = this.cartSvc.getCart()
      console.log(this.cart);
    }
  }

  cssImgZoom(): any {
    return {
      'img-zoom-out': !this.imageZoom,
      'img-zoom-in': this.imageZoom,
    }
  }
  
  getTotalPrice(): number {
    return this.cartSvc.getTotalPrice();
  }

  goToProduct(item: Product): void {
    this.addedCart = false;
    this.router.navigateByUrl(`/product/${item._id}`)  
  }
  
}
