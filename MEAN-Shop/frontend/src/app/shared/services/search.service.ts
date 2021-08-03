import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private URL = 'http://localhost:3000/api/search';

  constructor( private http: HttpClient ) { }

  search(search: string): Observable<any> {
    return this.http.post<any>( `${this.URL}/product`, { search: search } );
  }

  suggestions(search: string): Observable<any[] | null> {
    return this.http.post<any>( this.URL, { search: search } );
  }
}
