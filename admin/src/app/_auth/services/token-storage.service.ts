import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  rol: string;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    location.href="/#/login";
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
  if(sessionStorage.getItem(TOKEN_KEY)==null){
    location.href="/#/login";
  }else{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    if(sessionStorage.getItem(USER_KEY) != null){
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
    location.href="/#/login";
  }

  public getRol(): any {
      var roles = JSON.parse(sessionStorage.getItem(USER_KEY)!);
      return roles['roles'];
  }  
}