// material-table.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table';
import { SuppliersService } from '../suppliers/services/suppliers.service';
import { PayTypeService } from '../paytype/services/paytype.service';
import { PosService } from './services/pos.service';
import { ProductsService } from '../products/services/products.service';
import { TokenStorageService } from '../../_auth/services/token-storage.service';


@Component({
  selector: 'app-material-table',
  templateUrl: './templates/pos.component.html',
  styleUrls: ['./css/pos.component.scss']
})
export class PosComponent implements OnInit {

  title = 'Punto de Venta';
  username: string;
  names: string;
  payShop : void;
  spl = [];
  pt = [];
  vr = [];
  sl = [];
  it = [];
  tt = [];
  cc = [];

  dataSourceOne: MatTableDataSource<any>;
  displayedColumnsOne: string[] = ['description', 'may', 'stock', 'actions'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  dataSourceTwo: MatTableDataSource<any>;
  displayedColumnsTwo: string[] = ['description', 'selling_price', 'total', 'quantity', 'actions'];
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;

  constructor(
    private pos: PosService, 
    private suppliers : SuppliersService,
    private paytype : PayTypeService,
    private products : ProductsService,
    private tokenStorage: TokenStorageService,
  ) {
    this.dataSourceOne = new MatTableDataSource;
    this.dataSourceTwo = new MatTableDataSource;
    this.getProducts();
    this.getItems();
    this.verify();
    this.getTotalItems();
  }

  getProducts(){
    this.products.getProducts().subscribe(
      data => {
        this.dataSourceOne.data = data;
        this.dataSourceOne.paginator = this.tableOnePaginator;
        this.dataSourceOne.sort = this.tableOneSort;
      },
      err => {
        return JSON.parse(err.error).message;
      }
    );
  }

  getItems(){
    this.pos.getItems().subscribe( 
      data => {
        this.dataSourceTwo.data = data;
        this.dataSourceTwo.sort = this.tableTwoSort;
      },
      err => {
        return JSON.parse(err.error).message;
      }
    );
  }

  deleteItems(item_id){
    let data = {
      "item_id": item_id
    };
    this.pos.postDelItems(data)
    .subscribe(response => {
      if(response==200){
        this.getItems();
        this.getTotalItems();
      }
    });
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

  setItems(id, selling_price){

    let data = {
      "products_id": id,
      "sale_id": this.sl['id'],
      "selling_price": selling_price,
      "quantity": 1
    };
  
    this.pos.postSetItems(data)
    .subscribe(response => {
    if(response==200){
      this.getItems();
      this.getTotalItems();
    }
    });
  }

  getSuppliers(){
    this.suppliers.getSuppliers().subscribe(
      data => this.spl = data,
      err => {
        return JSON.parse(err.error).message;
      }
    );
  }

  getPayType(){
    this.paytype.getPayType().subscribe(
      data => this.pt = data,
      err => {
        return JSON.parse(err.error).message;
      }
    );
  }

  getTotalItems(){
    this.pos.getTotalItems().subscribe(
      data => this.tt = data[0],
      err => {
        return JSON.parse(err.error).message;
      }
    );
    
  }

  posQuantityCalculate(event:any, id, selling_price) {
    var op = parseFloat(event.target.value)*parseFloat(selling_price);

    let data = {
      "sales_item_id": id,
      "total": op,
      "quantity": event.target.value
    };
  
    this.pos.postMultiplierItems(data)
    .subscribe(response => {
    if(response==200){
      this.getItems();
      this.getTotalItems();
    }
    });
    
  }

  moneyDiscount(event:any){

    console.log(event.target.value);

  }

  getPayShop(event:any){
    this.payShop = event.target.value; 
  }

  ngOnInit() {

    this.getSuppliers();
    this.getPayType();
    this.username = this.tokenStorage.getUser().username;


   }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }
}