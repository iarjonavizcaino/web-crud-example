import { Injectable } from '@angular/core';

import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

import { Product } from "../models/product";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

const apiUrl = 'http://localhost:3000/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation='operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
          .pipe(
            tap(h => console.log("Consulta de productos")),
            catchError(this.handleError<Product[]>('getProducts',[]))
          );
  }

  getProduct(_id: string):Observable<Product> {
    const url = `${apiUrl}/${_id}`;
    return this.http.get<Product>(url).pipe(
      tap(_=> console.log('Consulta de producto')),
      catchError(this.handleError<Product>(`getProduct _id=${_id}`))
    );
  }

  addProduct(product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((product:Product)=> console.log(`producto añadido _id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(_id, product): Observable<any> {
    const url = `${apiUrl}/${_id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_=> console.log("Producto actualizado")),
      catchError(this.handleError<any>('updateProduct'))
    );
  } 

  deleteProduct(_id):Observable<Product> {
    const url = `${apiUrl}/${_id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_=>console.log("OK!!")),
      catchError(this.handleError<Product>('deleteProduct'))
    )
  }

}
