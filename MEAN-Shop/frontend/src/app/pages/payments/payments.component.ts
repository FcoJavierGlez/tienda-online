import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  creditCards: any[] = [];
  private userSvc$!: any;

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.userSvc.creditCards$.subscribe();
  }

}
