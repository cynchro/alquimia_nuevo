import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./products.component";
import { ProductsCreateComponent } from "./products.create.component";
import { ProductsEditComponent } from "./products.edit.component";
import { ProductsShowComponent } from "./products.show.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Productos'
    }
  },
  {
    path: 'create',
    component: ProductsCreateComponent,
    data: {
      title: 'Crear Producto'
    }
  },
  {
    path: 'edit/:id',
    component: ProductsEditComponent,
    data: {
      title: 'Editar Producto'
    }
  },
  {
    path: 'show/:id',
    component: ProductsShowComponent,
    data: {
      title: 'Informacion del Producto'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
