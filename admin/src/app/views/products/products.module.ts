import { NgModule } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { ProductsComponent } from "./products.component";
import { ProductsEditComponent } from "./products.edit.component";
import { ProductsCreateComponent } from "./products.create.component";
import { ProductsShowComponent } from "./products.show.component";
import { ProductsRoutingModule } from "./products.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FlashMessagesModule } from 'flash-messages-angular';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogModule } from '../dialog/dialog.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsEditComponent,
    ProductsCreateComponent,
    ProductsShowComponent
  ],
  imports: [
    ProductsRoutingModule,
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
export class ProductsModule { 
  constructor() {}
}
