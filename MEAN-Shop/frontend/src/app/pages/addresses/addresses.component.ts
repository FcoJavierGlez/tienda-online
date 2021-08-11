import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses: UserAddress[] = [];

  private accessSvc$: any;
  private userSvc$: any;

  constructor( 
    private userSvc: UserService,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  ngOnDestroy(): void {
    this.userSvc$.unsubscribe();
  }

  getAddresses(): void {
    if ( !this.cookiesSvc.checkLogin() ) return;
    if ( this.cookiesSvc.getToken() == '' ) 
      this.accessSvc$ = this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
        .subscribe(
          res => {
            this.cookiesSvc.login( res.token, res.refresh );
            this.userSvc$ = this.userSvc.getAddresses( this.cookiesSvc.getToken() )
              .subscribe(
                addresses => {
                  this.addresses = addresses;
                }
              );
          }
        );
    else
      this.userSvc$ = this.userSvc.getAddresses( this.cookiesSvc.getToken() )
        .subscribe(
          addresses => {
            this.addresses = addresses;
          }
        );
  }

  goToNewAddress(): void {
    this.router.navigate( ['/address'] );
  }

  refreshList(event: Event): void {
    this.getAddresses();
  }

}
