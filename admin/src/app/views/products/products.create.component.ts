import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users-create',
  templateUrl: './templates/products.create.component.html',
  styleUrls: ['./css/products.create.component.scss']
})
export class ProductsCreateComponent implements OnInit {

  title = "Crear Producto"
  roles: string;

  constructor(
    private _flashMessagesService : FlashMessagesService, 
    private products : ProductsService) { }

  ngOnInit(): void {

  }

  create(form) {

    let data = {
      "id": form.value.id,
      "item": form.value.item,
      "description": form.value.description,
      "barcode": form.value.barcode,
      "china": form.value.china,
      "uy": form.value.uy,
      "may": form.value.may,
      "stock": form.value.stock,
      "stock_min": form.value.stock_min,
    };

    this.products.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Producto fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
