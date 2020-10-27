import { Component, OnInit } from '@angular/core';
import { Order } from '../Interfaces/Order';
import { User } from '../Interfaces/User';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';
import { product } from '../Interfaces/Product';
import { ProductService } from '../services/product.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
const   apiUrl: string = environment.baseurl;




@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders  : Array<Order> = new Array<Order> () ;  
  user : User  ; 
  first : product ;
  uploadUrl  =apiUrl ;  
  constructor(
    private LoginService : LoginService , 
    private OrderService : OrderService , 
    private ProductServce : ProductService,
    public platform: Platform,
    private router : Router
  ) {

   
}

    ngOnInit() {


      this.LoginService.getCurrentUser().subscribe( data =>{
        this.user = data.user; 
          this.OrderService.getOrdersById(this.user._id).subscribe( data=>{
          this.orders = data;  
         //   console.log(data) ; 
            this.orders.forEach((element,index) =>{
              this.orders[index].products.forEach((elt , ind )=>{
                this.ProductServce.getproductById(this.orders[index].products[ind]).subscribe(data =>{
                  this.orders[index].products[ind] = data ; 
                 // console.log(data)
                })
              })
          }) 
        })
      })
  
  
  }



  consult(obj){
    this.OrderService.changeOrder(obj) ; 
    this.router.navigate(['/consult-order']) ; 
  }

}