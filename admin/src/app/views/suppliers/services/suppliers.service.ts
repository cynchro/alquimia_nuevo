import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../../_auth/services/token-storage.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

 headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  getSuppliers(): Observable<any> {

    return this.http.get(environment.apiUrl + 'suppliers/all', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in suppliers service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }

  getSingle(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'suppliers/'+id, { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in suppliers service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }

  postCreate(post){

    return this.http.post(environment.apiUrl + 'suppliers/create', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in suppliers service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }

  postEdit(post){

    return this.http.post(environment.apiUrl + 'suppliers/store', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in suppliers service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }

  delete(post){

    return this.http.post(environment.apiUrl + 'suppliers/delete', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in suppliers service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }
}
