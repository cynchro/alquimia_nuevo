import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayTypeService } from './services/paytype.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/paytype.edit.component.html',
  styleUrls: ['./css/paytype.edit.component.scss']
})
export class PayTypeEditComponent implements OnInit {

  title = "Editar Tipo de Pago";

  id: number;
  data = [];
  payt = [];
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private paytype: PayTypeService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.paytype.getSingle(this.route.snapshot.params.id).subscribe(val => this.payt = val[0]);
   };

   roleStatus(event){
     if(event.target.checked==true){
      this.isShown = ! this.isShown;
     }else{
      this.isShown = false ;
     }
   }

   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name
    };

    this.paytype.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Typo de Pago fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.paytype.getSingle(this.route.snapshot.params.id).subscribe(val => this.paytype = val[0]);
    });
    
  }
}
