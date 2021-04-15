import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../login/services/token-storage.service';

const API_URL = 'http://api.boilerplate/api/';

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

    return this.http.post(API_URL + 'password/update', post, {
      headers: this.headerOptions
    });

  }
}
