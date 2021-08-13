import { Component, OnInit } from '@angular/core';
import { UserCreditCards } from 'src/app/shared/interfaces/user-credit-cards';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  creditCards: UserCreditCards[] = [];
  private userSvc$!: any;

  constructor(
    private userSvc: UserService,
    private accessSvc: AccessService,
    private cookiesSvc: AppCookiesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userSvc$ = this.userSvc.creditCards$.subscribe(
      creditCards => this.creditCards = creditCards
    );
    if ( this.cookiesSvc.getToken() == '' ) await this.refreshToken();
    this.userSvc.getPayments( this.cookiesSvc.getToken() );
  }

  async refreshToken () {
    await this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
          .toPromise().then( res => {
            this.cookiesSvc.login( res.token, res.refresh );
          });
  }

  ngOnDestroy(): void {
    this.userSvc$?.unsubscribe();
  }

}
