import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from "./clients.component";
import { ClientsCreateComponent } from "./clients.create.component";
import { ClientsEditComponent } from "./clients.edit.component";
import { ClientsShowComponent } from "./clients.show.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Clientes'
    }
  },
  {
    path: 'create',
    component: ClientsCreateComponent,
    data: {
      title: 'Crear Cliente'
    }
  },
  {
    path: 'edit/:id',
    component: ClientsEditComponent,
    data: {
      title: 'Editar Cliente'
    }
  },
  {
    path: 'show/:id',
    component: ClientsShowComponent,
    data: {
      title: 'Informacion del Cliente'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
