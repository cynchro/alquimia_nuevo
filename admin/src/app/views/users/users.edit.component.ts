import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '../roles/services/roles.service';
import { UserService } from './services/users.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/users.edit.component.html',
  styleUrls: ['./css/users.edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  title = "Editar Usuario";

  id: number;
  data = [];
  user = [];
  roles: string;
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private users: UserService, private role: RolesService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.users.getSingle(this.route.snapshot.params.id).subscribe(val => this.user = val[0]);
    this.role.getRoles().subscribe(
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
    
  }
}
