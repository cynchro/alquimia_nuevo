import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { PosComponent } from "./pos.component";
import { PosRoutingModule } from "./pos.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [
    PosComponent
  ],
  imports: [
    PosRoutingModule,
    MaterialModules,
    HttpClientModule,
    CommonModule,
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  providers: [
    BsModalRef
  ]
})
export class PosModule { 
  constructor() {}
}
