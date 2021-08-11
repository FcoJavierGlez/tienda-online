import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';

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
import { BannerComponent } from './view-product/banner/banner.component';
import { SuggestsComponent } from './view-product/suggests/suggests.component';
import { AmzGuaranteeComponent } from './view-product/amz-guarantee/amz-guarantee.component';
import { PriceComponent } from './view-product/price/price.component';
import { AddressesComponent } from './addresses/addresses.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileCardComponent } from './profile/profile-card/profile-card.component';
import { AddressCardComponent } from './addresses/address-card/address-card.component';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from './address/address-form/address-form.component';


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
    BannerComponent,
    SuggestsComponent,
    AmzGuaranteeComponent,
    PriceComponent,
    AddressesComponent,
    MyOrdersComponent,
    PaymentsComponent,
    ProfileCardComponent,
    AddressCardComponent,
    AddressComponent,
    AddressFormComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule,
    MatBadgeModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class PagesModule { }
