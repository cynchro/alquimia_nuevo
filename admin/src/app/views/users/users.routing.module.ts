import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
import { UsersCreateComponent } from "./users.create.component";
import { UsersEditComponent } from "./users.edit.component";
import { UsersPasswordComponent } from "./users.password.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'create',
    component: UsersCreateComponent,
    data: {
      title: 'Crear Usuario'
    }
  },
  {
    path: 'edit/:id',
    component: UsersEditComponent,
    data: {
      title: 'Editar Usuario'
    }
  }
  ,
  {
    path: 'password/:id',
    component: UsersPasswordComponent,
    data: {
      title: 'Cambiar Contraseña'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
