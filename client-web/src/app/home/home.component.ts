import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../services/orders.service";
import { Order } from "../Interfaces/Order";
import { ProductsService } from "../services/products.service";
import { Router } from "@angular/router";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  orders: Array<Order> = new Array<Order>();
  uploadUrl: string;

  constructor(
    private orderService: OrdersService,
    private ProductServce: ProductsService,
    private router: Router,
    private socket: Socket
  ) {
    this.uploadUrl = localStorage.getItem("apiUrl");
  }

  ngOnInit() {
    console.log("here");
    this.getOrders();
    this.watch();
  }

  getOrders() {
    this.orderService.getAllOnProgressOrders().subscribe((data) => {
      this.orders = data;
      console.log(data);
      this.orders.forEach((element, index) => {
        this.orders[index].products.forEach((elt, ind) => {
          this.ProductServce.getproductById(
            this.orders[index].products[ind]
          ).subscribe((data) => {
            this.orders[index].products[ind] = data;
            // console.log(data)
          });
        });
      });
    });
  }

  watch() {
    return this.socket.fromEvent("notif").subscribe((data: any) => {
      console.log("jet");
      this.getOrders();
    });
  }

  view(row) {
    this.orderService.changeOrder(row);
    this.router.navigate(["/order-details"]);
  }
}
