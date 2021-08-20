import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/shared/interfaces/orders';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-my-order-view',
  templateUrl: './my-order-view.component.html',
  styleUrls: ['./my-order-view.component.css']
})
export class MyOrderViewComponent implements OnInit {

  private idOrder!: string;
  order!: Orders;

  private params$!: any;
  private orderSvc$!: any;

  constructor( 
    private orderSvc: OrdersService,
    private cookiesSvc: AppCookiesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe(
      param => {
        this.idOrder = param['id'];
        this.orderSvc$ = this.orderSvc.getOneUserOrder( this.cookiesSvc.getToken(), this.idOrder )
          .subscribe(
            res => this.order = res,
            err => this.router.navigate( ['/myorders'] )
          );
      }
    );
  }

  ngOnDestroy(): void {
    this.orderSvc$?.unsubscribe();
    this.params$?.unsubscribe();
  }

  getTotalPrice(): number {
    return this.order.order.map( e => e.price * ( (100 - e.discount) / 100 ) * e.quantity ).reduce( (e,acc) => e + acc );
  }

  cssStatus(): any {
    return {
      'canceled': this.order.status == 'Cancelado',
      'pending': this.order.status == 'Pendiente',
      'preparing': this.order.status == 'Preparando',
      'sended': this.order.status == 'Enviado',
      'delivered': this.order.status == 'Entregado',
      'fw-bold': true
    }
  }

}
