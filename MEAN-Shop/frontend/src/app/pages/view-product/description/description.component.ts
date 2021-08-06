import { Component, Input, OnInit } from '@angular/core';
import { Description } from 'src/app/shared/interfaces/description';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  @Input() description!: Description;

  constructor() { }

  ngOnInit(): void {
  }

}
