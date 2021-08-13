import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { UserCreditCards } from 'src/app/shared/interfaces/user-credit-cards';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order!: FormGroup;

  addressesList: UserAddress[] = [];
  creditCards: UserCreditCards[] = [];

  addressSelected: UserAddress = {
    _id: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    defaultAddress: false,
    name: '',
    nif: '',
    phone: 0,
    province: '',
    zipCode: 0
  };

  private userAddressesSvc$!: any;
  private userCreditCardsSvc$!: any;

  constructor( 
    private fb: FormBuilder,
    private userSvc: UserService,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService
  ) { }

  ngOnInit(): void {
    this.initServices();
  }

  ngOnDestroy(): void {
    this.userAddressesSvc$?.unsubscribe();
    this.userCreditCardsSvc$?.unsubscribe();
  }

  addressChange(): void {
    this.addressSelected = this.addressesList.find( e => e._id == this.order.get('address')?.value ) || this.addressSelected;
  }

  log(): void {
    console.log('credit',this.order.get('payment')?.value);
    //this.addressSelected = this.addressesList.find( e => e._id == this.order.get('address')?.value ) || this.addressSelected;
    // console.log('address after',this.order.get('address')?.value);
    
  }

  private async initServices(): Promise<void> {
    if ( this.cookiesSvc.getToken() == ''  ) await this.refreshToken();
    this.userSvc.creditCards$.subscribe( creditcards => this.creditCards = creditcards );
    this.userCreditCardsSvc$ = this.userSvc.getPayments( this.cookiesSvc.getToken() );
    this.userAddressesSvc$ = this.userSvc.getAddresses( this.cookiesSvc.getToken() )
      .subscribe(
        addresses => {
          this.addressesList = addresses;
          if (this.addressesList.length) this.addressSelected = this.addressesList[0];
          this.createForm();
        }
      );
  }

  async refreshToken () {
    await this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
          .toPromise().then( res => {
            this.cookiesSvc.login( res.token, res.refresh );
          });
  }

  onSubmit(event: Event): void {
    console.log(this.order.value);
    
  }

  checkAddressSelected(): boolean {
    return this.order.get('address')?.value !== '';
  }
  checkPaymentSelected(): boolean {
    return this.order.get('payment')?.value !== '';
  }

  getInfoCard(card: UserCreditCards): any {
    const cardNumber = `${card.cardNumber}`;
    switch (cardNumber) {
      case (cardNumber.match(/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/))?.input: 
        return ( { type: 'MasterCard / 4B / Euro6000', class: 'credit-logo mastercard' } );
      case (cardNumber.match(/^(4)/))?.input: return ( { type: 'Visa / Visa Electron', class: 'credit-logo visa' } );
      case (cardNumber.match(/^(34|37)/))?.input: return ( { type: 'American Express', class: 'credit-logo american-express' } );
      default: return ( { type: 'MasterCard / 4B / Euro6000', class: 'credit-logo mastercard' } );
    }
  }

  createForm(): void {
    this.order = this.fb.group(
      {
        address: [ 
          this.addressesList.length ? 
            this.addressesList[0]._id : '', [Validators.required] 
        ],
        payment: [ 
          this.creditCards.length ? 
            this.creditCards[0].id : '', [Validators.required] 
        ]
      }
    );
    console.log('Creado form',this.order.get('payment')?.value);
    
  }

}
