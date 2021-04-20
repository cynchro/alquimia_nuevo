import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles/services/roles.service';
import { PosService } from './services/pos.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-pos-create',
  templateUrl: './templates/pos.create.component.html',
  styleUrls: ['./css/pos.create.component.scss']
})
export class PosCreateComponent implements OnInit {

  title = "Crear Usuario"
  roles: string;

  constructor(private role : RolesService, private _flashMessagesService : FlashMessagesService, private pos : PosService) { }

  ngOnInit(): void {
    this.role.getRoles().subscribe(
      data => {
        this.roles = data;
      },
      err => {
        this.roles = JSON.parse(err.error).message;
      }
    );
  }

  create(form) {

    let data = {
      "name": form.value.name,
      "email": form.value.email,
      "password": form.value.password,
      "password_confirm": form.value.password_confirm,
      "role": form.value.role
    };

    this.pos.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Usuario fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
