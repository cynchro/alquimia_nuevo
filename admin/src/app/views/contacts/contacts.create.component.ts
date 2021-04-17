import { Component, OnInit } from '@angular/core';
import { ContactsService } from './services/contacts.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users-create',
  templateUrl: './templates/contacts.create.component.html',
  styleUrls: ['./css/contacts.create.component.scss']
})
export class ContactsCreateComponent implements OnInit {

  title = "Crear Cliente"
  roles: string;

  constructor(private _flashMessagesService : FlashMessagesService, private contacts : ContactsService) { }

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

    this.contacts.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Cliente fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
