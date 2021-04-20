import { Component, OnInit } from '@angular/core';
import { SuppliersService } from './services/suppliers.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users-create',
  templateUrl: './templates/suppliers.create.component.html',
  styleUrls: ['./css/suppliers.create.component.scss']
})
export class SuppliersCreateComponent implements OnInit {

  title = "Crear Proveedor"
  roles: string;

  constructor(private _flashMessagesService : FlashMessagesService, private suppliers : SuppliersService) { }

  ngOnInit(): void {

  }

  create(form) {

    let data = {
      "name": form.value.name,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city
    };

    this.suppliers.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Proveedor fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
