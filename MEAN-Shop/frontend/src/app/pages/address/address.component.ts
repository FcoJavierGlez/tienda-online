import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  idAddress!: string;
  data!: UserAddress;

  private userSvc$!: any;
  
  constructor( 
    private params: ActivatedRoute,
    private cookiesSvc: AppCookiesService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.params.queryParams.subscribe(
      param => {
        this.idAddress = param['id'];
        if ( this.idAddress !== undefined ) 
          this.userSvc$ = this.userSvc.getAddress( this.cookiesSvc.getToken(), this.idAddress )
                                      .subscribe( data => this.data = data );
      }
    );
  }

  ngOnDestroy(): void {
    this.userSvc$?.unsubscribe();
  }

}
