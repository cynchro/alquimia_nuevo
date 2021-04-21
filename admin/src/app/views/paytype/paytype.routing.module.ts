import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayTypeComponent } from "./paytype.component";
import { PayTypeCreateComponent } from "./paytype.create.component";
import { PayTypeEditComponent } from "./paytype.edit.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: PayTypeComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Tipos de Pago'
    }
  },
  {
    path: 'create',
    component: PayTypeCreateComponent,
    data: {
      title: 'Crear Tipo de Pago'
    }
  },
  {
    path: 'edit/:id',
    component: PayTypeEditComponent,
    data: {
      title: 'Editar Tipo de Pago'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayTypeRoutingModule { }
