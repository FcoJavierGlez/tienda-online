import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, DoCheck {

  search!: string;

  constructor( private params: ActivatedRoute ) { 
    
  }

  ngOnInit(): void {
    this.params.queryParams.subscribe(
      param => this.search = param['s']
    );
    console.log(this.search);
  }

  ngDoCheck(): void {
    console.log(this.search);
  }

}
