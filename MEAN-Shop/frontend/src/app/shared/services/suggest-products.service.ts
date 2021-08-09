import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class SuggestProductsService {

  private readonly URL = 'http://localhost:3000/api/suggest_products';

  constructor( private http: HttpClient ) { }

  getProductsWithSameTag(idProduct: string): Observable<Product[]> {
    return this.http.get<Product[]>( `${this.URL}/${idProduct}` );
  }
}
