import { Component, OnInit } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users-create',
  templateUrl: './templates/clients.create.component.html',
  styleUrls: ['./css/clients.create.component.scss']
})
export class ClientsCreateComponent implements OnInit {

  title = "Crear Cliente"
  roles: string;

  constructor(private _flashMessagesService : FlashMessagesService, private clients : ClientsService) { }

  ngOnInit(): void {

  }

  create(form) {

    let data = {
      "name": form.value.name,
      "ruc": form.value.ruc,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city
    };

    this.clients.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Cliente fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
