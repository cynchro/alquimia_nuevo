import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { PosComponent } from "./pos.component";
import { PosEditComponent } from "./pos.edit.component";
import { PosCreateComponent } from "./pos.create.component";
import { PosRoutingModule } from "./pos.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    PosComponent,
    PosEditComponent,
    PosCreateComponent
  ],
  imports: [
    PosRoutingModule,
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
export class PosModule { 
  constructor() {}
}
