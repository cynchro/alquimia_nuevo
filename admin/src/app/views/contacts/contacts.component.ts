import { Component,TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContactsService } from './services/contacts.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FlashMessagesService } from 'flash-messages-angular';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  templateUrl: './templates/contacts.component.html',
  styleUrls: ['./css/contacts.component.scss']
})

export class ContactsComponent{

  title = 'Clientes';
  content: string;
  displayedColumns: string[] = ['id', 'name', 'email', 'ruc', 'actions'];
  dataSource: MatTableDataSource<any>;
  modalRef: BsModalRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  
  constructor(private contacts: ContactsService, public modalService: BsModalService, private _flashMessagesService : FlashMessagesService) { 
  this.getcontacts();
  }

  getcontacts(){
    this.contacts.getContacts().subscribe(
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

  delete(){

  let data = {
    "id": (<HTMLInputElement>document.getElementById("user_id")).value
  };

  this.contacts.delete(data)

  .subscribe(response => {
  if(response==200){
    this._flashMessagesService.show('El Cliente fue eliminado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
  }
  this.modalRef.hide();
  this.getcontacts();
  });      
}

  ngOnInit(): void { }

}
