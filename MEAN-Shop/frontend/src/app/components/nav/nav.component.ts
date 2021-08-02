import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  login!: boolean;

  constructor( 
    private appCookies: AppCookiesService, 
    private router: Router
  ) { }

  ngOnInit(): void { this.login = this.appCookies.checkLogin(); }
  
  ngDoCheck() { this.login = this.appCookies.checkLogin(); }
  
  logOut(): void {
    this.appCookies.logout();
    this.router.navigate(['/']);
  }
}
