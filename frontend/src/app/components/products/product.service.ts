import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlBase = "http://localhost:3001/products";

  constructor(private snack: MatSnackBar, private http: HttpClient) { }

  showMessagem(msg:string, isError: boolean = false):void {
    this.snack.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlBase, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read():Observable<Product[]> {
    return this.http.get<Product[]> (this.urlBase).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: string):Observable<Product> {
    const url = `${this.urlBase}/${id}`;

    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product:Product): Observable<Product> {
    const url = `${this.urlBase}/${product.id}`;

    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number):Observable<Product> {
    const url = `${this.urlBase}/${id}`;

    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    this.showMessagem('Ocorreu um erro !', true);
    return EMPTY;
  }


}
