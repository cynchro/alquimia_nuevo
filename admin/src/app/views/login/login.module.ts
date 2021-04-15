import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
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
export class LoginModule { 
  constructor() {}
}
