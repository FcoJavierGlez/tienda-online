import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCookiesService } from '../services/app-cookies.service';

@Injectable({
  providedIn: 'root'
})
export class InvitedGuard implements CanActivate {
  constructor( private appCookies: AppCookiesService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.appCookies.checkLogin() ) this.router.navigate( ['/'] );
    return true;
  }
  
}
