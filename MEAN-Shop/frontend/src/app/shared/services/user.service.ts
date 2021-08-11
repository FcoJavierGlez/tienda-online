import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from '../interfaces/user-address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3000/api/user';

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
}
