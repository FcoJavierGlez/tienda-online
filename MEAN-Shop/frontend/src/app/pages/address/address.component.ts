import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


  idAddress!: string;
  
  constructor( 
    private params: ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.params.queryParams.subscribe(
      param => {
        this.idAddress = param['id'];
        // console.log('id address',this.idAddress);
      }
    );
  }

  cancel(event: Event): void {
    event.preventDefault();
    this.router.navigate( ['/addresses'] );
  }

}
