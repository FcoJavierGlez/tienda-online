import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, DoCheck, OnDestroy {

  search!: string;
  products!: any[];

  constructor( private params: ActivatedRoute, private searchSvc: SearchService ) { }

  ngOnInit(): void { 
    this.params.queryParams.subscribe(
      param => {
        this.search = param['s'];
        this.searchSvc.search( this.search ).subscribe(
          data => this.products = data
        );
      }
    );
  }

  ngDoCheck(): void { }

  ngOnDestroy(): void { }

}
