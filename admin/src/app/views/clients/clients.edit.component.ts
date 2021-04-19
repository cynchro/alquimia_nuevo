import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from './services/clients.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/clients.edit.component.html',
  styleUrls: ['./css/clients.edit.component.scss']
})
export class ClientsEditComponent implements OnInit {

  title = "Editar Usuario";

  id: number;
  data = [];
  cli = [];
  cnt = [];
  roles: string;
  isShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clients: ClientsService, 
    private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {

    this.clients.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);

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

    this.clients.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Cliente fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.clients.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);
    });
    
  }
}
