import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly URL = 'http://localhost:3000/api/order';

  constructor( private http: HttpClient) { }

  getUserOrders() {

  }
  getOneUserOrder() {
    
  }

  newOrder(token: string, order: Orders): Observable<any> {
    return this.http.post<any>( `${this.URL}`, order, { headers: { authorization: `Bearer ${token}` } } );
  }
}
