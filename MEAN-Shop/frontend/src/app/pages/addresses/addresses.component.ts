import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses: UserAddress[] = [];

  private userSvc$: any;

  constructor( 
    private userSvc: UserService,
    private cookiesSvc: AppCookiesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSvc$ = this.userSvc.getAddresses( this.cookiesSvc.getToken() )
                                .subscribe(
                                  addresses => {
                                    this.addresses = addresses;
                                    // console.log('direcciones', this.addresses);
                                  }
                                );
  }

  ngOnDestroy(): void {
    this.userSvc$.unsubscribe();
  }

  goToNewAddress(): void {
    this.router.navigate( ['/address'] );
  }

}
