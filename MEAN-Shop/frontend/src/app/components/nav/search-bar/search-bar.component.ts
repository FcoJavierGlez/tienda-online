import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  focus: boolean = false;
  textSearch: string = '';

  constructor( private router: Router  ) { }

  ngOnInit(): void {

  }

  search(): void {
    if ( this.textSearch.replace(/\s+/g, '') == '' ) this.router.navigate(['/search']);
    else {
      const SEARCH = this.textSearch.trim().replace(/\s+/g, ' ').replace(/\s/g, '%20');
      this.textSearch = '';
      this.router.navigateByUrl(`/search?s=${SEARCH}`);
    }
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
