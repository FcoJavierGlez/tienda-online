import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order!: FormGroup;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(event: Event): void {
    console.log(this.order.value);
    
  }

  createForm(): void {
    this.order = this.fb.group(
      {
        pago: ['', [Validators.required] ]
      }
    );
  }

}
