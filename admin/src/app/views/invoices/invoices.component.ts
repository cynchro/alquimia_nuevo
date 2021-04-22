import { Component,TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoicesService } from './services/invoices.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FlashMessagesService } from 'flash-messages-angular';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  templateUrl: './templates/invoices.component.html',
  styleUrls: ['./css/invoices.component.scss']
})

export class InvoicesComponent{

  title = 'Usuarios';
  content: string;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;
  modalRef: BsModalRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  
  constructor(public modalService: BsModalService, private _flashMessagesService : FlashMessagesService) { 
  
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



  ngOnInit(): void {  }
  
}
