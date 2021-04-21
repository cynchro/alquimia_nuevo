import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { PayTypeComponent } from "./paytype.component";
import { PayTypeEditComponent } from "./paytype.edit.component";
import { PayTypeCreateComponent } from "./paytype.create.component";
import { PayTypeRoutingModule } from "./paytype.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    PayTypeComponent,
    PayTypeEditComponent,
    PayTypeCreateComponent
  ],
  imports: [
    PayTypeRoutingModule,
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
export class PayTypeModule { 
  constructor() {}
}
