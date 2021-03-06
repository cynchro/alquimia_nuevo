import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { ClientsComponent } from "./clients.component";
import { ClientsEditComponent } from "./clients.edit.component";
import { ClientsCreateComponent } from "./clients.create.component";
import { ClientsShowComponent } from "./clients.show.component";
import { ClientsRoutingModule } from "./clients.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogModule } from '../dialog/dialog.module';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsEditComponent,
    ClientsCreateComponent,
    ClientsShowComponent
  ],
  imports: [
    ClientsRoutingModule,
    MaterialModules,
    HttpClientModule,
    CommonModule,
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    DialogModule
  ],
  providers: [
    BsModalRef
  ]
})
export class ClientsModule { 
  constructor() {}
}
