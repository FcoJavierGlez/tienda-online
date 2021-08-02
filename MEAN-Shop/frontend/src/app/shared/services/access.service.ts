import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppCookiesService } from './app-cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private readonly URL_ACCES = 'http://localhost:3000/api/access';

  constructor( private http: HttpClient, /* private appCookies: AppCookiesService */ ) { }

  login(body: any): Observable<any> {
    return this.http.post<any>( `${this.URL_ACCES}/login`, body );
  }

  register(body: any): Observable<any> {
    return this.http.post<any>( `${this.URL_ACCES}/register`, body );
  }

  activate(token: string): Observable<any> {
    return this.http.put<any>( `${this.URL_ACCES}/activate`, null, { headers: { authorization: `Bearer ${token}` } } );
  }

  refreshToken(refreshToken: string): Observable<any | boolean> {
    return this.http.get<any>( `${this.URL_ACCES}/refresh`, { headers: { authorization: `Bearer ${refreshToken}` } } );
  }

  getProfile(token: string): Observable<any> {
    return this.http.get<any>( `${this.URL_ACCES}/profile`, { headers: { authorization: `Bearer ${token}` } } );
  }

  validateProfile(token: string, profileName: string): Observable<boolean> {
    return this.http.get<any>( `${this.URL_ACCES}/profile`, { headers: { authorization: `Bearer ${token}` } } )
      .pipe(
        map(
          data => { return data.profile == profileName }
        )
      );
  }
}
