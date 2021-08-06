import { QueryList } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Product } from 'src/app/shared/interfaces/product';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';
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

  descripcion: any[] = [
    {
      type: 'p',
      text: ['Vendido y enviado por PlayStation 5 Store.']
    },
    {
      type: 'ul',
      text: ['Juego compatible con PlayStation 5.', 'Desarrollador Bluepoint/Japan Studios.', 'Incluye juego completo']
    }
  ]

  @ViewChildren(PreviewImageComponent) childrens!: QueryList<PreviewImageComponent>;

  constructor( 
    private searchSvc: SearchService, 
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

  private messageLoggedIn(): void {
    let registerDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Debe iniciar sesión',
        message: 'Debe iniciar sesión para poder realizar esta acción.',
        alertMessage: false,
        continueMessage: false,
        optionButtons: false
      }
    });
    registerDialog.afterClosed().subscribe( () => this.router.navigate( ['/login'] ) );
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
    else this.cartSvc.addProduct( this.product );
  }
  
}
