import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCookiesService } from '../services/app-cookies.service';

@Injectable({
  providedIn: 'root'
})
export class InvitedGuard implements CanActivate {
  constructor( private appCookies: AppCookiesService ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.appCookies.checkLogin();
  }
  
}
