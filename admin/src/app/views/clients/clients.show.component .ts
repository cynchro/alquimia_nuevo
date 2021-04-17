import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from './services/clients.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ContactsService } from '../contacts/services/contacts.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users.edit',
  templateUrl: './templates/clients.show.component.html',
  styleUrls: ['./css/clients.show.component.scss']
})


export class ClientsShowComponent {

  title_form = "Informacion de Usuario";
  title_table = "Contactos de Usuario";
  content: string;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone_number', 'actions'];
  dataSource: MatTableDataSource<any>;
  modalRef: BsModalRef;
  loading = true;
  errorMessage = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  id: number;
  data = [];
  cli = [];
  roles: string;
  isShown: boolean = false;
  errors: string;

  constructor(private route: ActivatedRoute, private clients: ClientsService, private _flashMessagesService: FlashMessagesService,private contacts: ContactsService, public modalService: BsModalService) { 
    this.getContacts();
  }

  getContacts(){
    this.clients.getClients().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(template: TemplateRef<any>, id) {
    const user = { id : id };
    this.modalRef = this.modalService.show(template, {
      initialState : user
    });
  }

  ngOnInit(): void {

    

    this.clients.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0])
  };

   handleError(error: Response) {
    if (error.status == 500) {      
      //this.router.navigate(['/login']);
    } else {
      return Observable.throw(error);
    }
}

   delete(){

    let data = {
      "id": (<HTMLInputElement>document.getElementById("user_id")).value
    };
  
    this.clients.delete(data)
  
    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Cliente fue eliminado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.modalRef.hide();
    this.getContacts();
    });
  }


   update(form) {

    let data = {
      "id": form.value.id,
      "name": form.value.name,
      "ruc": form.value.ruc,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city,
    };

    this.clients.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Cliente fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.clients.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);
    });
    
  }
}
