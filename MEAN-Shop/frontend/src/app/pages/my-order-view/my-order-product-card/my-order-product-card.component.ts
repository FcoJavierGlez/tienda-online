import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-my-order-product-card',
  templateUrl: './my-order-product-card.component.html',
  styleUrls: ['./my-order-product-card.component.css']
})
export class MyOrderProductCardComponent implements OnInit {

  @Input() product!: Product;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToProduct(): void {
    this.router.navigateByUrl( `/product/${this.product._id}` );
  }

}
