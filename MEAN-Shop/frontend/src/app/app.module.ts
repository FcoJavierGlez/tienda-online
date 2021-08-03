import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { MatMenuModule } from '@angular/material/menu';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CartButtonComponent } from './components/nav/cart-button/cart-button.component';
import { SearchBarComponent } from './components/nav/search-bar/search-bar.component';
import { UserButtonComponent } from './components/nav/user-button/user-button.component';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    MatMenuModule,
    PagesModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
