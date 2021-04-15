import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './services/users.service';
import { PasswordService } from './services/password.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/password.change.component.html',
  styleUrls: ['./css/password.change.component.scss']
})
export class UsersPasswordComponent implements OnInit {

  title = "Cambiar Contraseña";

  id: number;
  user = [];

  constructor(private route: ActivatedRoute, private users: UserService, private _FlashMessagesService: FlashMessagesService, private pass: PasswordService) { }


  ngOnInit(): void {
    this.users.getSingle(this.route.snapshot.params.id).subscribe(val => this.user = val[0]);
    this.id = this.route.snapshot.params.id;
  }
  
  create(form) {

    let data = {
      "id": form.value.id,
      "password": form.value.confirm_password,
      "password_confirm": form.value.password_confirm
    };

    this.pass.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('La contraseña fue cambiada correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.controls.add_password.reset("");
    form.controls.confirm_password.reset("");
  }

  
  /*
  id: number;
  data = [];
  user = [];
  roles: string;
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private users: UserService, private role: RoleService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.users.getSingle(this.route.snapshot.params.id).subscribe(val => this.user = val[0]);
    this.role.getRole().subscribe(
      data => {
        this.roles = data;
        this.id = this.route.snapshot.params.id;
      },
      err => {
        this.roles = JSON.parse(err.error).message;
      }
    );
   };

   roleStatus(event){
     if(event.target.checked==true){
      this.isShown = ! this.isShown;
     }else{
      this.isShown = false ;
     }
   }

   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name,
      "email": form.value.email,
      "role": form.value.role
    };

    this.users.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Usuario fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.users.getSingle(this.route.snapshot.params.id).subscribe(val => this.user = val[0]);
    });
    
  }*/
}
