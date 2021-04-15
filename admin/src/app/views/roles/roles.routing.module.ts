import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from "./roles.component";
import { RolesCreateComponent } from "./roles.create.component";
import { RolesEditComponent } from "./roles.edit.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Roles'
    }
  },
  {
    path: 'create',
    component: RolesCreateComponent,
    data: {
      title: 'Crear Rol'
    }
  },
  {
    path: 'edit/:id',
    component: RolesEditComponent,
    data: {
      title: 'Editar Rol'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
