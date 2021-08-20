import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

import { Tag } from 'src/app/shared/interfaces/tag';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  focus: boolean = false;
  textSearch: string = '';

  suggestions!: Tag[] | null;

  constructor( private router: Router, private searchSvc: SearchService ) { }

  ngOnInit(): void {

  }

  search(): void {
    if ( this.textSearch.replace(/\s+/g, '') == '' ) this.router.navigate(['/products']);
    else {
      const ROUTE = this.textSearch.trim().replace(/\s+/g, ' ').replace(/\s/g, '%20');
      this.textSearch = '';
      this.router.navigateByUrl( `/products?s=${ROUTE}` );
    }
  }

  getSuggestions(event: Event) {
    const keyBoardEvent = ( <KeyboardEvent> event );
    if (!this.textSearch.length) this.suggestions = [];
    else if ( keyBoardEvent.key.length > 1 ) return;
    else
    this.searchSvc.suggestions( this.textSearch ).subscribe(
      data => {
        this.suggestions = data;
      }
    );
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
