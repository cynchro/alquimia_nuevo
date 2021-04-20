import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { SuppliersComponent } from "./suppliers.component";
import { SuppliersEditComponent } from "./suppliers.edit.component";
import { SuppliersCreateComponent } from "./suppliers.create.component";
import { SuppliersRoutingModule } from "./suppliers.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    SuppliersComponent,
    SuppliersEditComponent,
    SuppliersCreateComponent
  ],
  imports: [
    SuppliersRoutingModule,
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
export class SuppliersModule { 
  constructor() {}
}
