import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from './services/roles.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/roles.edit.component.html',
  styleUrls: ['./css/roles.edit.component.scss']
})
export class RolesEditComponent implements OnInit {

  title = "Editar Rol";

  id: number;
  data = [];
  rl = [];
  roles: string;
  isShown: boolean = false;

  constructor(private route: ActivatedRoute, private role: RolesService, private _FlashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.role.getSingle(this.route.snapshot.params.id).subscribe(val => this.rl = val[0]);
    this.id = this.route.snapshot.params.id;

   };

   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name
    };

    this.role.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._FlashMessagesService.show('El Rol fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.role.getSingle(this.route.snapshot.params.id).subscribe(val => this.rl = val[0]);
    });
    
  }
  
}
