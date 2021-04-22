import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from "./invoices.component";
import { AuthGuard } from '../../_guards/auth.guards';


const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Proforma'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
