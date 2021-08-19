import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/interfaces/orders';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() order!: Orders;

  constructor() { }

  ngOnInit(): void {

  }

  totalProducts(): number {
    return this.order.order.map( e => e.quantity ).reduce( (e,acc) => e + acc );
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
