import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/interfaces/orders';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  ordersList!: Orders[];

  private ordersSvc$!: any;

  constructor( 
    private ordersSvc: OrdersService,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService
  ) { }

  async ngOnInit(): Promise<void> {
    if ( this.cookiesSvc.getToken() == '' ) await this.refreshToken();
    this.ordersSvc$ = this.ordersSvc.getUserOrders( this.cookiesSvc.getToken() ).subscribe(
      ordersList => {
        this.ordersList = ordersList;
        console.log(this.ordersList);
      }
    );
  }

  ngOnDestroy(): void {
    this.ordersSvc$?.unsubscribe();
  }

  async refreshToken () {
    await this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
          .toPromise().then( res => {
            this.cookiesSvc.login( res.token, res.refresh );
          });
  }

}
