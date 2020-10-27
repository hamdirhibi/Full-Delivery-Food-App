import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { product } from '../Interfaces/Product';
import { Order } from '../Interfaces/Order';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  @ViewChild("scheduledOrdersPaginator",{static: false}) paginator: MatPaginator;
  @ViewChild("MatSort",{static: false}) sort: MatSort;
  uploadUrl  : string  ;  
  displayedColumns = ['image', 'total', 'date', 'weight','status','view'];
  dataSource: MatTableDataSource<Order>;
  orders : Array<Order> = new Array<Order>(); 
  constructor(private orderService : OrdersService,
              private ProductService : ProductsService,
              private router : Router 
    ) {
      this.uploadUrl = localStorage.getItem('apiUrl') ;
     }

  ngOnInit() {
    this.load() ; 
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  load(){

    setTimeout( 
      ()=>{
    this.orderService.getAllOrders().subscribe(data=>{
      this.orders = data ;
      this.orders.forEach((element,index) =>{
        this.orders[index].products.forEach((elt , ind )=>{
          this.ProductService.getproductById(this.orders[index].products[ind]).subscribe(data =>{
            this.orders[index].products[ind] = data ; 
          })
        })

      })
      console.log(this.orders)

      this.dataSource = new MatTableDataSource(this.orders) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
    },500)
  }

  filter(filterValue){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  view(row){
    this.orderService.changeOrder(row) ; 
    this.router.navigate(['/order-details']) ; 
  }
  



}
