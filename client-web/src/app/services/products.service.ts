import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../Interfaces/Category';
import { product } from '../Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private subscripotion = new BehaviorSubject<product>(null); 
  currentProduct = this.subscripotion.asObservable() ; 


  baseurl : string ; 
  httpOptions = {
    headers: new HttpHeaders({
      'authorization':  'Bearer '+localStorage.getItem('access_token')
  
    })
  }
  constructor(private http: HttpClient,
    public router: Router) { 
      this.baseurl = localStorage.getItem('apiUrl') ;  
}



  // getAllproducts
  getAllproducts(): Observable<product[]> {
    let api = this.baseurl+'product/';
    return this.http.get<product[]>(api,this.httpOptions) ; 
  }  

  getproductById(id): Observable<product> {
    let api = this.baseurl+'product/getOne/'+id;
    return this.http.get<product>(api,this.httpOptions) ; 
  }



  addProduct(fd) : Observable<any>{
    console.log(fd)
    return this.http.post(this.baseurl+'product/addProduct',fd,this.httpOptions)
  }
  deleteProduct(id) : Observable<any>{
    return this.http.delete(this.baseurl+'product/deleteProduct/'+id,this.httpOptions)
  }
  changeProduct(product){
    this.subscripotion.next(product) ; 
  }
  updateName(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/name/'+id,{name : name},this.httpOptions)
  }
  updatePrice(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/price/'+id,{price : name},this.httpOptions)
  }
  updateAvailabily(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/available/'+id,{available : name},this.httpOptions)
  }

  updateUnitQte(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/unit_qte/'+id,{unit_qte : name},this.httpOptions)
  }
  updateUnitID(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/unit_id/'+id,{unit_id : name},this.httpOptions)
  }
  updateCategory(id,name){
    return this.http.patch(this.baseurl+'product/updateProduct/category/'+id,{category : name},this.httpOptions)
  }
  updateImage(id,fd){
    return this.http.patch(this.baseurl+'product/updateProduct/image/'+id,fd,this.httpOptions)
  }

}
