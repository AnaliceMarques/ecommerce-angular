import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any>{
    return this.http.get('http://localhost:3000/produtos')
  }

  addProduct(product: Product): Observable<any>  {
    return this.http.post('http://localhost:3000/produtos', product)
  }

  editProduct(product: Product): Observable<any>  {
    return this.http.put(`http://localhost:3000/produtos/${product.id}`, product)
  }

  deleteProduct(product: Product): Observable<any>  {
    return this.http.delete(`http://localhost:3000/produtos/${product.id}`)
  }

}
