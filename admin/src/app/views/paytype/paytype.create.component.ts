import { Component, OnInit } from '@angular/core';
import { PayTypeService } from './services/paytype.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-paytype-create',
  templateUrl: './templates/paytype.create.component.html',
  styleUrls: ['./css/paytype.create.component.scss']
})
export class PayTypeCreateComponent implements OnInit {

  title = "Crear Tipo de Pago"
  roles: string;

  constructor(private role : PayTypeService, private _flashMessagesService : FlashMessagesService, private paytype : PayTypeService) { }

  ngOnInit(): void {

  }

  create(form) {

    let data = {
      "name": form.value.name
    };

    this.paytype.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Typo de Pago fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
      
    });
    form.reset();
  }

}
