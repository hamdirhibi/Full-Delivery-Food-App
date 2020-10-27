import { Component, OnInit } from '@angular/core';
import { Order } from '../Interfaces/Order';
import { OrderService } from '../services/order.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
const   apiUrl: string = environment.baseurl;

@Component({
  selector: 'app-consult-order',
  templateUrl: './consult-order.page.html',
  styleUrls: ['./consult-order.page.scss'],
})
export class ConsultOrderPage implements OnInit {
  order : Order ; 
  uploadUrl  =apiUrl ;  

  constructor(private OrderService : OrderService,
              private router : Router , 
    ) {

      this.OrderService.currentOrder.subscribe(async o=>{
        this.order =  o ;
        if (o==null)
        this.router.navigate(['/orders']); 
        
        this.order.products.forEach((elt , index)=>{
            this.order.products[index].ctn = this.order.quantities[index] ; 
        }) 
      })
    }
  

     

  ngOnInit() {
  }

}
