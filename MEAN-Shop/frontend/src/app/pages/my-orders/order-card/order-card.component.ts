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
      'canceled fw-bold': this.order.status == 'Cancelado',
      'pending fw-bold': this.order.status == 'Pendiente',
      'preparing fw-bold': this.order.status == 'Preparando',
      'sended fw-bold': this.order.status == 'Enviado',
      'delivered fw-bold': this.order.status == 'Entregado'
    }
  }

}
