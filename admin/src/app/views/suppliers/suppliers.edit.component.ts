import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuppliersService } from './services/suppliers.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/suppliers.edit.component.html',
  styleUrls: ['./css/suppliers.edit.component.scss']
})
export class SuppliersEditComponent implements OnInit {

  title = "Editar Proveedor";
 
  id: number;
  data = [];
  sup = []; 
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private suppliers: SuppliersService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.suppliers.getSingle(this.route.snapshot.params.id).subscribe(val => this.sup = val[0]);

   };


   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city
    };

    this.suppliers.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Proveedor fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.suppliers.getSingle(this.route.snapshot.params.id).subscribe(val => this.sup = val[0]);
    });
    
  }
}
