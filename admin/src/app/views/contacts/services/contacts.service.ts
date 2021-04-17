import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../_auth/services/token-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

 headerOptions = new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': 'Bearer ' + this.tokenStorageService.getToken()
 });

  getContacts(): Observable<any> {

    return this.http.get(environment.apiUrl + 'contacts/all', { headers: this.headerOptions, responseType: 'json' });
  }

  getSingle(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'contacts/'+id, { headers: this.headerOptions, responseType: 'json' });
  }

  postCreate(post){

    return this.http.post(environment.apiUrl + 'contacts/create', post, {
      headers: this.headerOptions
    });
  }

  postEdit(post){

    return this.http.post(environment.apiUrl + 'contacts/store', post, {
      headers: this.headerOptions
    });
  }

  delete(post){

    return this.http.post(environment.apiUrl + 'contacts/delete', post, {
      headers: this.headerOptions
    });
  }
}
