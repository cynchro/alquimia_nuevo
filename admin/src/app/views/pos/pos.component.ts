import { Component,TemplateRef, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { SuppliersService } from '../suppliers/services/suppliers.service';
import { PayTypeService } from '../paytype/services/paytype.service';
import { PosService } from './services/pos.service';
import { ProductsService } from '../products/services/products.service';
import { TokenStorageService } from '../../_auth/services/token-storage.service';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  templateUrl: './templates/pos.component.html',
  styleUrls: ['./css/pos.component.scss']
})

export class PosComponent{


  title = 'Punto de Venta';
  content: string;
  displayedColumnsProducts: string[] = ['description', 'may', 'stock', 'actions'];
  displayedColumnsItems: string[] = ['description', 'may', 'stock', 'actions'];
  dataSourceProducts: MatTableDataSource<any>;
  dataSourceItems: MatTableDataSource<any>;
  modalRef: BsModalRef;
  spl = [];
  pt = [];
  vr = [];
  sl = [];
  it = [];
  username: string;
  names: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  @ViewChild(MatPaginator) paginatorItems: MatPaginator;
  @ViewChild(MatSort) sortItems: MatSort; 
  
  constructor(
    private pos: PosService, 
    public modalService: BsModalService, 
    private _flashMessagesService : FlashMessagesService,
    private suppliers : SuppliersService,
    private paytype : PayTypeService,
    private products : ProductsService,
    private tokenStorage: TokenStorageService
    ) { 
    this.verify();
  }

  verify(){
    let data = {
      "user_id": this.tokenStorage.getUser().id
    };
    this.pos.verify(data)
    .subscribe(response => {
      this.sl = response[0]; 
    });
  }

  getProducts(){
    this.products.getProducts().subscribe(
      data => {
        this.dataSourceProducts = new MatTableDataSource(data);
        this.dataSourceProducts.paginator = this.paginator;
        this.dataSourceProducts.sort = this.sort;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProducts.paginator) {
      this.dataSourceProducts.paginator.firstPage();
    }
  }

  getItems(){
    this.pos.getItems().subscribe( 
      data => {
        this.dataSourceItems = new MatTableDataSource(data);
        this.dataSourceItems.paginator = this.paginatorItems;
        this.dataSourceItems.sort = this.sortItems;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  quantityCalculate(newQuantity: string) {
    console.log(newQuantity); 
  }

  setItems(id){
    console.log(id);
    console.log(this.sl);
  }

  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceItems.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceItems.paginator) {
      this.dataSourceItems.paginator.firstPage();
    }
  }*/



  openModal(template: TemplateRef<any>, id) {
    const user = { id : id };
    this.modalRef = this.modalService.show(template, {
      initialState : user
    });
  }
/*
  delete(){

  let data = {
    "id": (<HTMLInputElement>document.getElementById("user_id")).value
  };

  this.pos.delete(data)

  .subscribe(response => {
  if(response==200){
    this._flashMessagesService.show('El Usuario fue eliminado correctamente!', { cssClass: 'alert-success', timeout: 3000 });
  }
  this.modalRef.hide();
  });
}*/

  getSuppliers(){
    this.suppliers.getSuppliers().subscribe(
      data => this.spl = data,
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  getPayType(){
    this.paytype.getPayType().subscribe(
      data => this.pt = data,
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }



  ngOnInit(): void {  
    this.getSuppliers();
    this.getPayType();
    //this.verify();
    this.getProducts();
    this.getItems();
    this.username = this.tokenStorage.getUser().username;      
  }
}
