import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../../_auth/services/token-storage.service';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  postCreate(post){

    return this.http.post(environment.apiUrl + 'password/update', post, { headers: this.headerOptions }).pipe(
      catchError((err) => {
        console.log('error caught in password service')
        console.error(err['error']['message']);
        return throwError(err);
      })
    );
  }
}
