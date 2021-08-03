import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitedGuard } from './shared/guards/invited.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component'; 
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent, canActivate: [InvitedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [InvitedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
