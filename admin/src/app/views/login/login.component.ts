import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_auth/services/auth.service';
import { TokenStorageService } from '../../_auth/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './templates/login.component.html',
  styleUrls: ['./css/login.component.scss']
  
})
export class LoginComponent implements OnInit { 

  title = "Acceso"
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles;
    }
    //this.tokenStorage.signOut();
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data['token']);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        location.href="/#";
      },
      err => {
        //this.errorMessage = err.error.message;
        this.errorMessage = 'Datos incorrectos, verifique por favor.';
        this.isLoginFailed = true;
      }
    );
  }
/*
  reloadPage(): void {
    window.location.reload();
  }
*/
}
