import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() option!: any;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goToPage(): void {
    this.router.navigate( [`${this.option.link}`] );
  }

}
