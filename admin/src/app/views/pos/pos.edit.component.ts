import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '../roles/services/roles.service';
import { PosService } from './services/pos.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-pos.edit',
  templateUrl: './templates/pos.edit.component.html',
  styleUrls: ['./css/pos.edit.component.scss']
})
export class PosEditComponent implements OnInit {

  title = "Editar Usuario";

  id: number;
  data = [];
  //pos = [];
  roles: string;
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private pos: PosService, private role: RolesService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.pos.getSingle(this.route.snapshot.params.id).subscribe(val => this.pos = val[0]);
    this.role.getRoles().subscribe(
      data => {
        this.roles = data;
        this.id = this.route.snapshot.params.id;
      },
      err => {
        this.roles = JSON.parse(err.error).message;
      }
    );
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
      "name": form.value.name,
      "email": form.value.email,
      "role": form.value.role
    };

    this.pos.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Usuario fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.pos.getSingle(this.route.snapshot.params.id).subscribe(val => this.pos = val[0]);
    });
    
  }
}
