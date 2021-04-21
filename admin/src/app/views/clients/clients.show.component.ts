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

  title_form = "Informacion de Cliente";
  title_table = "Contactos de Cliente";
  content: string;
  displayedColumns: string[] = ['id', 'name', 'phone_number', 'actions'];
  dataSource: MatTableDataSource<any>;
  modalRef: BsModalRef;
  loading = true;
  errorMessage = "";
  
  @ViewChild('show') modalShow: TemplateRef<any>;
  @ViewChild('edit') modalEdit: TemplateRef<any>;
  @ViewChild('delete') modalDelete: TemplateRef<any>;
  @ViewChild('create') modalCreate: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  id: number;
  data = [];
  cli = [];
  cnt = [];
  roles: string;
  isShown: boolean = false;
  errors: string;

  constructor(
    private route: ActivatedRoute, 
    private clients: ClientsService, 
    private _flashMessagesService: FlashMessagesService,
    private contacts: ContactsService, 
    public modalService: BsModalService
    ) { 
    this.getContacts();
  }

  getContacts(){
    this.contacts.getClientsContacts(this.route.snapshot.params.id).subscribe(
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

  getSingleContacts(){
    this.contacts.getSingleClientsContacts(this.route.snapshot.params.id).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  updateContact(form) {

    let data = {
      "id": form.value.contact_id,
      "name": form.value.name,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city,
    };

    this.contacts.postEdit(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Contacto fue editado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.getContacts();
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showModal(template: TemplateRef<any>, id) {
    const user = { id : id };
    this.modalRef = this.modalService.show(this.modalShow, {  
      initialState : user
    });
    this.contacts.getSingleClientsContacts(user.id).subscribe(val => this.cnt = val[0]);
  }

  editModal(template: TemplateRef<any>, id) {
    const user = { id : id };
    this.modalRef = this.modalService.show(this.modalEdit, {
      initialState : user
    });
    this.contacts.getSingleClientsContacts(user.id).subscribe(val => this.cnt = val[0]);
  }

  deleteModal(template: TemplateRef<any>, id) {
    const user = { id : id };
    this.modalRef = this.modalService.show(this.modalDelete, {
      initialState : user
    });
  }
  
  createModal() {
    this.modalRef = this.modalService.show(this.modalCreate, {
      initialState : null
    });
  }

  ngOnInit(): void {
    this.clients.getSingle(this.route.snapshot.params.id).subscribe(val => this.cli = val[0]);
  };

   handleError(error: Response) {
    if (error.status == 500) {      
      //this.router.navigate(['/login']);
    } else {
      return Observable.throw(error);
    }
}

   deleted(){

    let data = {
      "id": (<HTMLInputElement>document.getElementById("contact_id")).value
    };
  
    this.contacts.delete(data)
  
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

  createContact(form) {

    let data = {
      "cli": this.route.snapshot.params.id,
      "name": form.value.name,
      "email": form.value.email,
      "phone_number": form.value.phone_number,
      "address": form.value.address,
      "city": form.value.city,
    };

    this.contacts.postCreate(data)

    .subscribe(response => {
    if(response==200){
      this._flashMessagesService.show('El Contacto fue creado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
    }
    this.getContacts();
    });
    
  }
}
