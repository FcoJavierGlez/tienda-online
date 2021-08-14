import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitedGuard } from './shared/guards/invited.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component'; 
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { OrderComponent } from './pages/order/order.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { AddressComponent } from './pages/address/address.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { PaymentsComponent } from './pages/payments/payments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', pathMatch: 'full', component: ViewProductComponent },
  { path: 'order', component: OrderComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [InvitedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [InvitedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [LoggedInGuard] },
  { path: 'address', component: AddressComponent, canActivate: [LoggedInGuard] },
  { path: 'addresses', component: AddressesComponent, canActivate: [LoggedInGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [LoggedInGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
