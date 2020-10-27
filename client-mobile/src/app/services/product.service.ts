import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ingredient } from '../Interfaces/ingredient';
import { product } from '../Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentUser = {};
  baseurl : string ; 
  options = {
    responseType: 'text',
  };
  httpOptions2 = {
    headers: new HttpHeaders({
      'authorization':  'Bearer '+localStorage.getItem('access_token')
    })
  }
  constructor(private http: HttpClient,
    public router: Router) { 
      this.baseurl =  localStorage.getItem('apiUrl') ; 
    }
   

  // getAllproducts
  getAllproducts(): Observable<product[]> {
    let api = this.baseurl+'product/';
    return this.http.get<product[]>(api,this.httpOptions2) ; 
  
  }
  getproductById(id): Observable<product> {
    let api = this.baseurl+'product/getOne/'+id;
    return this.http.get<product>(api,this.httpOptions2) ; 
  }


}
