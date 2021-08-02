import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  focus: boolean = false;

  constructor() { }

  ngOnInit(): void {

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
