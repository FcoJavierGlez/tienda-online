import { Component, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  showFormNewAddress: boolean = false;

  addresses: UserAddress[] = [];
  private userSvc$: any;

  constructor( 
    private userSvc: UserService,
     private cookiesSvc: AppCookiesService 
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

  toggleShowFormNewAddress(): void {
    this.showFormNewAddress = !this.showFormNewAddress;
  }

  cancelFormNewAddress(event: Event): void {
    event.preventDefault();
    this.showFormNewAddress = false;
  }

}
