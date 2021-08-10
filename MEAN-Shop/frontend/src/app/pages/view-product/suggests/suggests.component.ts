import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-suggests',
  templateUrl: './suggests.component.html',
  styleUrls: ['./suggests.component.css']
})
export class SuggestsComponent implements OnInit {

  @Input() products!: Product[];

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToProduct(item: Product): void {
    this.router.navigateByUrl(`/product/${item._id}`)  
  }

}
