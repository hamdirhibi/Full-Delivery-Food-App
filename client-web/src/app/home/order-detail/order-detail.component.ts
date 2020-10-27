import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/Interfaces/Order";
import { OrdersService } from "src/app/services/orders.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  constructor(
    private orderService: OrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.orderService.currentOrder.subscribe((data) => {
      this.order = data;
      if (data == null) this.router.navigate(["/home"]);

      this.order.products.forEach((elt, index) => {
        this.order.products[index].ctn = this.order.quantities[index];
      });
      // view order in case it wasn't viewed
      if (!this.order.view) {
        this.viewOrder();
      }
    });
  }

  accepted() {
    this.orderService.acceptedOrder(this.order._id).subscribe(
      (data) => {
        this.toastr.success("Order Accepted ", "Done ");
        this.router.navigate(["historic"]);
      },
      (err) => {
        this.toastr.warning(err.error, "Warning ");
        console.log(err);
      }
    );
  }

  refused() {
    this.orderService.refusedOrder(this.order._id).subscribe(
      (data) => {
        this.toastr.success("Order Refused ", "Done ");
        this.router.navigate(["historic"]);
      },
      (err) => {
        this.toastr.warning(err.error, "Warning ");
        console.log(err);
      }
    );
  }

  confirmed() {
    this.orderService.confirmedOrder(this.order._id).subscribe(
      (data) => {
        this.toastr.success("Order Confirmed ", "Done ");
        this.router.navigate(["historic"]);
      },
      (err) => {
        this.toastr.warning(err.error, "Warning ");
        console.log(err);
      }
    );
  }

  //change it to view
  viewOrder() {
    this.orderService.viewOrder(this.order._id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => this.toastr.warning(err.error, "Warning")
    );
  }
}
