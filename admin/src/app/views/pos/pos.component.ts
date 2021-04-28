// material-table.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table';
import { SuppliersService } from '../suppliers/services/suppliers.service';
import { PayTypeService } from '../paytype/services/paytype.service';
import { PosService } from './services/pos.service';
import { ProductsService } from '../products/services/products.service';
import { TokenStorageService } from '../../_auth/services/token-storage.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

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

  suma = <any>[];
  tableTwo = [];
  price : any;
  quantity:any

  formGroup: FormGroup;
  subTotal: number = 0;
  sumaTotal: number = 0;
  listaFormGroup: any;
  myFormValueChanges$: any;
  listaItems = [
    { nombre: "Item 1", precio: 10, cantidad: 1, subTotal: 10 },
    { nombre: "Item 2", precio: 50, cantidad: 1, subTotal: 50 }
  ];

  dataSourceOne: MatTableDataSource<any>;
  displayedColumnsOne: string[] = ['description', 'may', 'stock', 'actions'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;


  displayedColumnsTwo: string[] = ['description', 'selling_price', 'total', 'quantity', 'actions'];
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;

  constructor(
    private pos: PosService, 
    private suppliers : SuppliersService,
    private paytype : PayTypeService,
    private products : ProductsService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder
  ) {
    this.dataSourceOne = new MatTableDataSource;

    this.getProducts();
    this.getItems();
    this.verify();
    this.getTotalItems();
    this.test;
    
  }

  test(val){
console.log(val);
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
        this.tableTwo = data;
        //console.log(data);
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

  /** *suma de todos los items el total de esto*/
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

    //console.log(data);
  
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

    this.formGroup = this.formBuilder.group({
      cliente: new FormControl("Prueba de Cliente"),
      items: this.formBuilder.array([])
    });

    this.cargarItemsAlFormGroup();

    this.myFormValueChanges$ = this.formGroup.controls["items"].valueChanges;

    this.myFormValueChanges$.subscribe((detalles: any) => this.updateTotals(detalles));

    
   }

  applyFilterOne(filterValue: string) {
    this.dataSourceOne.filter = filterValue.trim().toLowerCase();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  calcSubTotal(price,quantity){
    var op = parseFloat(price)*parseFloat(quantity);
    return op.toFixed(2);

  } 

  get formArr() {
    return this.formGroup.get("items") as FormArray;
  }

  cargarItemsAlFormGroup() {
    for (let item of this.listaItems) {
      let fbi = this.formBuilder.group({
        nombres: new FormControl(item.nombre),
        cantidad: new FormControl(item.cantidad),
        precio: new FormControl(item.precio),
        subTotal: new FormControl(item.precio * item.cantidad)
      });
      this.sumaTotal += item.cantidad * item.precio;

      (<FormArray>this.formGroup.get("items")).push(fbi);
    }
  }

  updateTotals(detalles: any) {
    const control = <FormArray>this.formGroup.controls["items"];
    this.sumaTotal = 0;
    for (let i in detalles) {
      let lineTotal = +detalles[+i].cantidad * +detalles[+i].precio;
      console.warn(lineTotal);
      (<FormArray>this.formGroup.get("items"))
        .at(+i)
        .get("subTotal")
        .setValue(+lineTotal, { emitEvent: false });
      this.sumaTotal += lineTotal;
    }
  }

  onTrackBy(index: number) {
    return index;
  }
  ngOnDestroy(): void {
    if (this.myFormValueChanges$) {
      this.myFormValueChanges$.unsubscribe();
    }
  }
  
}