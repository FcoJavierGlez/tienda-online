import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { PreviewImageComponent } from './view-product/preview-image/preview-image.component';
import { ProductCartComponent } from './cart/product-cart/product-cart.component';
import { DescriptionComponent } from './view-product/description/description.component';
import { OrderComponent } from './order/order.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MatBadgeModule } from '@angular/material/badge';
import { BannerComponent } from './view-product/banner/banner.component';



@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CartComponent,
    ProductsComponent,
    ProductCardComponent,
    ViewProductComponent,
    PreviewImageComponent,
    ProductCartComponent,
    DescriptionComponent,
    OrderComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    MatBadgeModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class PagesModule { }
