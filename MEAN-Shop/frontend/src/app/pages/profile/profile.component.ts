import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  options: any [] = [
    {
      icon: 'fas fa-box',
      title: 'Mis pedidos',
      description: 'Realizar el seguimiento, modificar pedidos, devolver un producto...',
      link: '/myorders' /* /profile/myorders */
    },
    {
      icon: 'fas fa-address-book',
      title: 'Direcciones',
      description: 'Editar direcciones y preferencias de envío para pedidos y regalos',
      link: '/addresses' /* /profile/addresses */
    },
    {
      icon: 'fas fa-coins',
      title: 'Tus pagos',
      description: 'Gestionar métodos de pago y configuraciones',
      link: '/payments' /* /profile/payments */
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
