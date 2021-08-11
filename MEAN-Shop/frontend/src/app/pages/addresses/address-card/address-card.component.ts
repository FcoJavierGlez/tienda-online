import { Component, Input, OnInit } from '@angular/core';
import { UserAddress } from 'src/app/shared/interfaces/user-address';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent implements OnInit {

  @Input() address!: UserAddress;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void { }

  getLocation(): string {
    return `${this.address.province}, ${this.address.city} ${this.address.zipCode}`;
  }

  log(event: Event): void {
    event.preventDefault();
    console.log(this.address._id);
    
  }

}
