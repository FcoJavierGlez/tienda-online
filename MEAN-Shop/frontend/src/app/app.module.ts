import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { NavComponent } from './components/nav/nav.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartButtonComponent } from './components/nav/cart-button/cart-button.component';
import { SearchBarComponent } from './components/nav/search-bar/search-bar.component';
import { UserButtonComponent } from './components/nav/user-button/user-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CartButtonComponent,
    SearchBarComponent,
    UserButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
