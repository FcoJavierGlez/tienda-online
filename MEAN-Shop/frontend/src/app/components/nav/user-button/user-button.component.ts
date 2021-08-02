import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent implements OnInit {

  @Input() login!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(): void {
    console.log('click');
    
  }

}
