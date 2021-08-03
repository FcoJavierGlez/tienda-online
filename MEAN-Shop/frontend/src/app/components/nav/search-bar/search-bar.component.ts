import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  focus: boolean = false;
  textSearch: string = '';

  suggestions!: any[] | null;

  constructor( private router: Router, private searchSvc: SearchService ) { }

  ngOnInit(): void {

  }

  search(): void {
    if ( this.textSearch.replace(/\s+/g, '') == '' ) this.router.navigate(['/search']);
    else {
      //const SEARCH = this.textSearch.trim().replace(/\s+/g, ' ');
      const ROUTE = this.textSearch.trim().replace(/\s+/g, ' ').replace(/\s/g, '%20');
      this.textSearch = '';
      this.router.navigateByUrl( `/search?s=${ROUTE}` );
    }
  }

  getSuggestions() {
    if (!this.textSearch.length) this.suggestions = [];
    else
    this.searchSvc.suggestions( this.textSearch ).subscribe(
      data => {
        this.suggestions = data;
      }
    )
  }

  toggleFocus(): void {
    this.focus = !this.focus;
  }

  cssSearchButton(): any {
    return {
      'ceramic-focus': this.focus
    }
  }

}
