import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit {

  @Input() login!: boolean;

  private totalItems: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getTotalItems(): string {
    return this.totalItems >= 100 ? '+99' : `${this.totalItems}`;
  }

  cssTotalItems(): any {
    return {
      'gt-0': this.totalItems > 0,
      'lt-10': this.totalItems < 10,
      'geqt-10': this.totalItems >= 10 && this.totalItems < 100,
      'geqt-100': this.totalItems >= 100
    }
  }

}
