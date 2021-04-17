import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from "./contacts.component";
import { ContactsCreateComponent } from "./contacts.create.component";
import { ContactsEditComponent } from "./contacts.edit.component";
import { ContactsShowComponent } from "./contacts.show.component ";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Contactos'
    }
  },
  {
    path: 'create',
    component: ContactsCreateComponent,
    data: {
      title: 'Crear CContacto'
    }
  },
  {
    path: 'edit/:id',
    component: ContactsEditComponent,
    data: {
      title: 'Editar Ccontacto'
    }
  }
  ,
  {
    path: 'show/:id',
    component: ContactsShowComponent,
    data: {
      title: 'Informacion del Contacto'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
