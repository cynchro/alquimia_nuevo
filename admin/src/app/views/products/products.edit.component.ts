import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './services/products.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/products.edit.component.html',
  styleUrls: ['./css/products.edit.component.scss']
})
export class ProductsEditComponent implements OnInit {

  title = "Editar Producto";

  id: number;
  data = [];
  prd = [];
  cnt = [];
  roles: string;
  isShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private products: ProductsService, 
    private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {

    this.products.getSingle(this.route.snapshot.params.id).subscribe(val => this.prd = val[0]);

   };


   update(form) {

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

    this.products.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Cliente fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.products.getSingle(this.route.snapshot.params.id).subscribe(val => this.prd = val[0]);
    });
    
  }
}
