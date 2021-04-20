import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from "./suppliers.component";
import { SuppliersCreateComponent } from "./suppliers.create.component";
import { SuppliersEditComponent } from "./suppliers.edit.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: SuppliersComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Proveedores'
    }
  },
  {
    path: 'create',
    component: SuppliersCreateComponent,
    data: {
      title: 'Crear Proveedor'
    }
  },
  {
    path: 'edit/:id',
    component: SuppliersEditComponent,
    data: {
      title: 'Editar Proveedor'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
