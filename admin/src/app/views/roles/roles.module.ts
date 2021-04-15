import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { RolesComponent } from "./roles.component";
import { RolesEditComponent } from "./roles.edit.component";
import { RolesCreateComponent } from "./roles.create.component";
import { RolesRoutingModule } from "./roles.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    RolesComponent,
    RolesEditComponent,
    RolesCreateComponent
  ],
  imports: [
    RolesRoutingModule,
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
export class RolesModule { 
  constructor() {}
}
