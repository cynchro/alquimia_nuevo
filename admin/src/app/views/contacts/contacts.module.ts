import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { ContactsComponent } from "./contacts.component";
import { ContactsEditComponent } from "./contacts.edit.component";
import { ContactsCreateComponent } from "./contacts.create.component";
import { ContactsShowComponent } from "./contacts.show.component ";
import { UsersRoutingModule } from "./contacts.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    ContactsComponent,
    ContactsEditComponent,
    ContactsCreateComponent,
    ContactsShowComponent
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
export class ContactsModule { 
  constructor() {}
}
