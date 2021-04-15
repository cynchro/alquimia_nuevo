import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { UsersComponent } from "./users.component";
import { UsersEditComponent } from "./users.edit.component";
import { UsersCreateComponent } from "./users.create.component";
import { UsersPasswordComponent } from "./users.password.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    UsersComponent,
    UsersEditComponent,
    UsersCreateComponent,
    UsersPasswordComponent
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
export class UsersModule { 
  constructor() {}
}
