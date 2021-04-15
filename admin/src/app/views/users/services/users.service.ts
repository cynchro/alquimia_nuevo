import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../login/services/token-storage.service';

const API_URL = 'http://api.boilerplate/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

 headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  getUsers(): Observable<any> {

    return this.http.get(API_URL + 'user/all', { headers: this.headerOptions, responseType: 'json' });
  }

  getSingle(id): Observable<any> {
    return this.http.get(API_URL + 'user/'+id, { headers: this.headerOptions, responseType: 'json' });
  }

  postCreate(post){

    return this.http.post(API_URL + 'user/create', post, {
      headers: this.headerOptions
    });
  }

  postEdit(post){

    return this.http.post(API_URL + 'user/update/', post, {
      headers: this.headerOptions
    });
  }

  delete(post){

    return this.http.post(API_URL + 'user/delete', post, {
      headers: this.headerOptions
    });
  }
}
