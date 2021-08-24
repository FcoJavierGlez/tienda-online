import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-novelties-suggest',
  templateUrl: './novelties-suggest.component.html',
  styleUrls: ['./novelties-suggest.component.css']
})
export class NoveltiesSuggestComponent implements OnInit {

  @Input() products!: Product[];

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToProduct(item: Product): void {
    this.router.navigateByUrl(`/product/${item._id}`)  
  }

}
