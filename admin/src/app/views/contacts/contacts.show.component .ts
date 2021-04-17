import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from './services/contacts.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/contacts.show.component.html',
  styleUrls: ['./css/contacts.show.component.scss']
})
export class ContactsShowComponent implements OnInit {

  title = "Informacion de Usuario";

  id: number;
  data = [];
  cli = [];
  roles: string;
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private contacts: ContactsService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {

    this.contacts.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);

   };


   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name,
      "ruc": form.value.ruc,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city,
    };

    this.contacts.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Cliente fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.contacts.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);
    });
    
  }
}
