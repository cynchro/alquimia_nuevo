import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../../_auth/services/token-storage.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  getRoles(): Observable<any> {
    return this.http.get(environment.apiUrl + 'role/all', { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in roles service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  getSingle(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'role/'+id, { headers: this.headerOptions, responseType: 'json' }).pipe(
      catchError((err) => {
        console.log('error caught in roles service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postCreate(post){

    return this.http.post(environment.apiUrl + 'role/create', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in roles service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  postEdit(post){

    return this.http.post(environment.apiUrl + 'role/store', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in roles service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }

  delete(post){

    return this.http.post(environment.apiUrl + 'role/delete', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in roles service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }
}
