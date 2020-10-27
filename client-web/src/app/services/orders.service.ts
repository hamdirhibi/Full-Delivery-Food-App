import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Order } from "../Interfaces/Order";

const baseUrl = environment.baseurl;

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private orderSource = new BehaviorSubject<Order>(null);
  currentOrder = this.orderSource.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      authorization: "Bearer " + localStorage.getItem("access_token"),
    }),
  };
  constructor(private http: HttpClient) {}

  getAllOnProgressOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      baseUrl + "order/onProgress",
      this.httpOptions
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(baseUrl + "order/", this.httpOptions);
  }

  changeOrder(order) {
    this.orderSource.next(order);
  }

  acceptedOrder(id) {
    return this.http.patch(
      baseUrl + "order/accepted/" + id,
      {},
      this.httpOptions
    );
  }

  refusedOrder(id) {
    return this.http.patch(
      baseUrl + "order/refused/" + id,
      {},
      this.httpOptions
    );
  }

  confirmedOrder(id) {
    return this.http.patch(
      baseUrl + "order/confirmed/" + id,
      {},
      this.httpOptions
    );
  }

  //view an order
  viewOrder(id): any {
    return this.http.put<any>(
      baseUrl + "order/view/" + id,
      {},
      this.httpOptions
    );
  }
}
