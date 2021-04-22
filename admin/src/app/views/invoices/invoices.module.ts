import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { InvoicesComponent } from "./invoices.component";
//import { UsersEditComponent } from "./invoices.edit.component";
//import { UsersCreateComponent } from "./invoices.create.component";
import { UsersRoutingModule } from "./invoices.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    InvoicesComponent
    //UsersEditComponent,
    //UsersCreateComponent,
  ],
  imports: [
    UsersRoutingModule,
    MaterialModules,
    HttpClientModule,
    CommonModule,
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    BsModalRef
  ]
})
export class InvoicesModule { 
  constructor() {}
}
