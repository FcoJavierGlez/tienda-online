import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;

  constructor( private router: Router ) { }

  ngOnInit(): void { }

  goToProduct(): void {
    this.router.navigateByUrl(`/product/${this.product._id}`);
  }

  cssPrice(): any {
    return {
      'sale-price': this.product.discount > 0
    }
  }

}
