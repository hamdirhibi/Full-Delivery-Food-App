import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Order } from "../Interfaces/Order";
import * as io from "socket.io-client";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private orderSource = new BehaviorSubject<Order>(null);
  currentOrder = this.orderSource.asObservable();
  baseurl: string;
  options = {
    responseType: "text",
  };
  httpOptions2 = {
    headers: new HttpHeaders({
      authorization: "Bearer " + localStorage.getItem("access_token"),
    }),
  };
  constructor(
    private http: HttpClient,
    public router: Router,
    private socket: Socket
  ) {
    this.baseurl = localStorage.getItem("apiUrl");
  }

  changeOrder(o) {
    this.orderSource.next(o);
  }
  addOrder(obj): Observable<Order> {
    let api = this.baseurl + "order/addOrder";
    return this.http.post<Order>(api, obj, this.httpOptions2);
  }

  send_order(data) {
    this.socket.emit("new-order", data);
  }

  newOrderJoined() {
    let observable = new Observable<Order>((observer) => {
      this.socket.on("new-order", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // getAll orders
  getAllOrdes(): Observable<Order[]> {
    let api = this.baseurl + "order/";
    return this.http.get<Order[]>(api, this.httpOptions2);
  }
  getOrdersById(id): Observable<Order[]> {
    let api = this.baseurl + "order/" + id;
    return this.http.get<Order[]>(api, this.httpOptions2);
  }
  getOneOrderById(id): Observable<Order> {
    let api = this.baseurl + "order/getOne/" + id;
    return this.http.get<Order>(api, this.httpOptions2);
  }
}
