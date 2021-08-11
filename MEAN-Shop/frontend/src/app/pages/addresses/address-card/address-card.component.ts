import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {

  @Input() address!: UserAddress;
  @Input() index!: number;

  @Output() refeshList = new EventEmitter();

  private userDeleteAddressSvc$!: any;
  private accessSvc$!: any;

  constructor( 
    private router: Router,
    private dialog: MatDialog,
    private userSvc: UserService,
    private accessSvc: AccessService,
    private cookiesSvc: AppCookiesService
  ) { }

  ngOnInit(): void { }

  ngOnDelete(): void {
    this.userDeleteAddressSvc$?.unsubscribe();
  }

  getLocation(): string {
    return `${this.address.province}, ${this.address.city} ${this.address.zipCode}`;
  }

  goToEdit(): void {
    this.router.navigateByUrl(`/address?id=${this.address._id}`);
  }

  deleteAddress(event: Event): void {
    event.preventDefault();
    if ( !this.cookiesSvc.checkLogin() ) return;
    let deleteAddressDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Login fallido',
        message: 'Está a punto de borrar esta dirección.',
        alertMessage: true,
        continueMessage: true,
        optionButtons: true
      }
    });
    
    if ( this.cookiesSvc.getToken() == '' ) 
      this.accessSvc$ = this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
        .subscribe(
          res => {
            this.cookiesSvc.login( res.token, res.refresh );
            deleteAddressDialog.afterClosed().subscribe(
              res => {
                if (res) {
                  this.userDeleteAddressSvc$ = this.userSvc.deleteAddress( this.cookiesSvc.getToken(), this.address._id )
                  .subscribe(
                    res => this.refeshList.emit()
                  );
                }
              }
            );
          }
        );
    else
      deleteAddressDialog.afterClosed().subscribe(
        res => {
          if (res) {
            this.userDeleteAddressSvc$ = this.userSvc.deleteAddress( this.cookiesSvc.getToken(), this.address._id )
              .subscribe(
                res => this.refeshList.emit()
              );
          }
        }
      );
  }

  cssHeader(): any {
    return {
      'default': this.address.defaultAddress
    }
  }

}
