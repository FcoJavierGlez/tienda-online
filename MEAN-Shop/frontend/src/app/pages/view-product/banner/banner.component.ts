import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() cart!: Product[];
  @Input() totalPrice!: number;

  constructor( private router: Router ) { }

  ngOnInit(): void { }

  goToProduct(item: Product): void {
    this.router.navigateByUrl( `/product/${item._id}` )
  }

}
