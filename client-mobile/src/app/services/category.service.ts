import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { product } from '../Interfaces/Product';
import { Category } from '../Interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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
  getAllCategories(): Observable<Category[]> {
    let api = this.baseurl+'category/';
    return this.http.get<Category[]>(api,this.httpOptions2) ; 
  }


}
