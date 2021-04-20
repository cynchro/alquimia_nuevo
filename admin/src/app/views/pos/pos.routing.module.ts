import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosComponent } from "./pos.component";
import { PosCreateComponent } from "./pos.create.component";
import { PosEditComponent } from "./pos.edit.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'create',
    component: PosCreateComponent,
    data: {
      title: 'Crear Usuario'
    }
  },
  {
    path: 'edit/:id',
    component: PosEditComponent,
    data: {
      title: 'Editar Usuario'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
