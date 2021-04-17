import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  login(register){
  return this.http.post(environment.apiUrl + 'auth/signin', 
  {
    email: register.username,
    password: register.password
  },
  {
    headers: this.headerOptions
  });
}


  postCreate(register){
    return this.http.post(environment.apiUrl + 'auth/signup', 
    {
    name: register.username,
    email: register.email,
    password: register.password,
    password_confirmation: register.password
    }, 
    {
    headers: this.headerOptions
  });
}

  logout(){
    return this.http.post(environment.apiUrl + 'auth/logout', 
    {
    headers: this.headerOptions
  });
}
}