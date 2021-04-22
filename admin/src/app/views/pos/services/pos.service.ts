import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../../_auth/services/token-storage.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class PosService {


  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

 headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });
/*
  getUsers(): Observable<any> {

    return this.http.get(environment.apiUrl + 'user/all', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in users service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  getSingle(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'user/'+id, { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in users service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }*/

  verify(post){

    return this.http.post(environment.apiUrl + 'sales/verify', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in verify service')
        console.error(err['error']);
        return throwError(err);
      })
    );
  }

  getItems(): Observable<any> {
    return this.http.get(environment.apiUrl + 'sales/items/1', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in products service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postSetItems(post){

    return this.http.post(environment.apiUrl + 'sales/items/add', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in set items service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postDelItems(post){

    return this.http.post(environment.apiUrl + 'sales/items/del', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in del items service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postMultiplierItems(post){

    return this.http.post(environment.apiUrl + 'sales/items/qcalc', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in del items service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  getTotalItems(): Observable<any> {

    return this.http.get(environment.apiUrl + 'sales/items/total/1', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in paytype service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  getMoneyDiscount(): Observable<any> {

    return this.http.get(environment.apiUrl + 'sales/items/total/1', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in paytype service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }
  /*
  postCreate(post){

    return this.http.post(environment.apiUrl + 'user/create', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in users service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postEdit(post){

    return this.http.post(environment.apiUrl + 'user/store', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in users service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  delete(post){

    return this.http.post(environment.apiUrl + 'user/delete', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in users service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }*/
}
