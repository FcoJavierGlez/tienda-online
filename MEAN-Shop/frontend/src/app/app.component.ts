import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCookiesService } from './shared/services/app-cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'frontend';

  constructor( private appCookies: AppCookiesService, private router: Router ) {
    this.appCookies.initCookies();
  }

  ngOnInit() {
    //if ( !this.appCookies.checkLogin() || this.router.url == '/login' || this.router.url == '/register' ) return;
  }

  ngDoCheck(): void { }
}
