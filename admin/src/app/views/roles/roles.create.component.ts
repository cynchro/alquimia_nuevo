import { Component, OnInit } from '@angular/core';
import { RolesService } from './services/roles.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users-create',
  templateUrl: './templates/roles.create.component.html',
  styleUrls: ['./css/roles.create.component.scss']
})
export class RolesCreateComponent implements OnInit {

  title = "Crear Rol"

  constructor(private role : RolesService, private _flashMessagesService : FlashMessagesService) { }

  ngOnInit(): void {  }


  create(form) {

    let data = {
      "name": form.value.name
    };

    this.role.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Rol fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
