import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private URL = 'http://localhost:3000/api/search';

  constructor( private http: HttpClient ) { }

  suggestions(search: string): Observable<Tag[] | null> {
    return this.http.post<Tag[]>( this.URL, { search: search } );
  }

  search(search: string): Observable<Product[]> {
    return this.http.post<Product[]>( `${this.URL}/product`, { search: search } );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>( `${this.URL}/product/${id}` );
  }
}
