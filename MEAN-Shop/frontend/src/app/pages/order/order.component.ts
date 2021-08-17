import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Product } from 'src/app/shared/interfaces/product';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { UserCreditCards } from 'src/app/shared/interfaces/user-credit-cards';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order!: FormGroup;
  orderPlaced: boolean = false;
  messageOrderPlaced!: string;

  addressesList: UserAddress[] = [];
  creditCards: UserCreditCards[] = [];
  // cart!: Product[];

  addressSelected!: UserAddress;
  cardSelected!: UserCreditCards;

  private userAddressesSvc$!: any;
  private userCreditCardsSvc$!: any;
  private orderSvc$!: any;

  constructor( 
    private fb: FormBuilder,
    private userSvc: UserService,
    private cartSvc: CartService,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService,
    private router: Router,
    private dialog: MatDialog,
    private orderSvc: OrdersService
  ) { }

  ngOnInit(): void {
    this.initServices();
  }

  ngOnDestroy(): void {
    this.userAddressesSvc$?.unsubscribe();
    this.userCreditCardsSvc$?.unsubscribe();
    this.orderSvc$?.unsubscribe();
  }

  addressChange(): void {
    this.addressSelected = this.addressesList.find( e => e._id == this.order.get('address')?.value ) || this.addressSelected;
  }
  cardChange(): void {
    this.cardSelected = this.creditCards.find( e => e.id == this.order.get('payment')?.value ) || this.cardSelected;
  }

  goTo(route: string): void {
    this.router.navigate( [`/${route}`] );
  }

  private async initServices(): Promise<void> {
    if ( this.cookiesSvc.getToken() == ''  ) await this.refreshToken();
    // this.cart = this.cartSvc.getCart();
    
    this.userSvc.creditCards$
      .subscribe( 
        creditcards => {
          this.creditCards = creditcards;
          if ( this.creditCards.length ) this.cardSelected = this.creditCards[0];
        } 
      );
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

  getTotalProducts(): number {
    return this.cartSvc.getTotalItems();
  }
  getTotalPrice(): number {
    return this.cartSvc.getTotalPrice();
  }

  private prepareOrder(order: any): void {
    order.address = this.addressSelected;
    order.creditCard = this.cardSelected;
    order.order = this.cartSvc.getCart();
    order.instructions = this.order.get('instructions')?.value;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if ( !this.cookiesSvc.checkLogin()  ) this.router.navigate( ['/login'] );
    if ( this.cookiesSvc.getToken() == ''  ) await this.refreshToken();
    const order: any = {};
    this.prepareOrder(order);

    let messageLoggedInDialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirmación de pedido',
        message: '¿Desea realizar el pedido con los datos seleccionados?',
        alertMessage: false,
        continueMessage: false,
        optionButtons: true
      }
    });
    messageLoggedInDialog.afterClosed().subscribe( res => {
      if (res) {
        this.orderSvc$ = this.orderSvc.newOrder( this.cookiesSvc.getToken(), order ).subscribe(
          res => {
            this.messageOrderPlaced = res.message;
            this.cartSvc.resetCart();
            this.orderPlaced = true;
          }
        );
      }
    } );
    
  }

  checkAddressSelected(): boolean {
    return this.order.get('address')?.value !== '';
  }
  checkPaymentSelected(): boolean {
    return this.order.get('payment')?.value !== '' && !this.cardExpired( this.cardSelected );
  }

  getInfoCard(card: UserCreditCards): any {
    const cardNumber = `${card.cardNumber}`;
    switch (cardNumber) {
      case (cardNumber.match(/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/))?.input: 
        return ( { type: 'MasterCard / 4B / Euro6000', class: 'mastercard' } );
      case (cardNumber.match(/^(4)/))?.input: return ( { type: 'Visa / Visa Electron', class: 'visa' } );
      case (cardNumber.match(/^(34|37)/))?.input: return ( { type: 'American Express', class: 'american-express' } );
      default: return ( { type: 'MasterCard / 4B / Euro6000', class: 'mastercard' } );
    }
  }

  private cardExpired(card: UserCreditCards): boolean {
    const currentDate = new Date();
    return card.year < currentDate.getFullYear() || card.year == currentDate.getFullYear() && card.month < currentDate.getMonth() + 1;
  }

  cssCreditCard(card: UserCreditCards): any {
    return {
      'mastercard': this.getInfoCard(card).class == 'mastercard',
      'visa': this.getInfoCard(card).class == 'visa',
      'american-express': this.getInfoCard(card).class == 'american-express',
      'expired': this.cardExpired(card)
    }
  }

  cssCardExpired(card: UserCreditCards): any {
    return {
      'expired': this.cardExpired(card)
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
        ],
        instructions: [ '' ]
      }
    );
  }

}
