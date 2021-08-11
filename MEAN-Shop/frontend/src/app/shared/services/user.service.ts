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
}
