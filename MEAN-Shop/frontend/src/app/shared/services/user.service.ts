import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from '../interfaces/user-address';
import { UserCreditCards } from '../interfaces/user-credit-cards';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3000/api/user';

  private creditCards: UserCreditCards[] = [];
  creditCards$ = new EventEmitter<any>();

  constructor( private http: HttpClient ) { }

  /* Address */
  getAddresses(token: string): Observable<UserAddress[]> {
    return this.http.get<UserAddress[]>( `${this.URL}/addresses`, { headers: { authorization: `Bearer ${token}` } } );
  }
  getAddress(token: string, idAddress: string): Observable<UserAddress> {
    return this.http.get<UserAddress>( `${this.URL}/address/${idAddress}`, { headers: { authorization: `Bearer ${token}` } } );
  }
  addAddress(token: string, address: any): Observable<any> {
    return this.http.post<any>( `${this.URL}/address`, address, { headers: { authorization: `Bearer ${token}` } } );
  }
  updateAddress(token: string, address: any, idAddress: string): Observable<any> {
    return this.http.put<any>( `${this.URL}/address/${idAddress}`, address, { headers: { authorization: `Bearer ${token}` } } );
  }
  deleteAddress(token: string, idAddress: string): Observable<any> {
    return this.http.delete<any>( `${this.URL}/address/${idAddress}`, { headers: { authorization: `Bearer ${token}` } } );
  }

  /* Credit cards */
  getPayments(token: string): void {
    this.http.get<UserCreditCards[]>( `${this.URL}/payments`, { headers: { authorization: `Bearer ${token}` } } ).subscribe(
      creditCards => {
        this.creditCards = creditCards;
        this.creditCards$.emit( this.creditCards );
      }
    );
  }
  private updatePayments(token: string): void {
    this.http.put<UserCreditCards[]>( `${this.URL}/payments`, this.creditCards, { headers: { authorization: `Bearer ${token}` } } )
      .subscribe();
  }

  addCreditCard(token: string, creditCard: UserCreditCards): void {
    creditCard.id = !this.creditCards.length ? 0 : this.creditCards.map( e => e.id ).sort( (id1: number = 0,id2: number = 0) => id2 - id1 )[0];
    creditCard.id = creditCard.id == undefined ? 0 : creditCard.id + 1;
    this.creditCards.push( creditCard );
    this.creditCards$.emit( this.creditCards );
    this.updatePayments( token );
  }

  deleteCreditCard(token: string, creditCard: UserCreditCards): void {
    this.creditCards = this.creditCards.filter( e => e.id !== creditCard.id );
    this.creditCards$.emit( this.creditCards );
    this.updatePayments( token );
  }
}
