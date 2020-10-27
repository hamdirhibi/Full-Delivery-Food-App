import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../Interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  currentUser = {};
  baseurl : string ; 
  options = {
    responseType: 'text',
  };
  
  httpOptions = {
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
    return this.http.get<Category[]>(api,this.httpOptions) ; 
  }

  addCategory(fd) : Observable<any>{
    return this.http.post(this.baseurl+'category/addCategory',fd,this.httpOptions)
  }
  deleteCategory(id) : Observable<any>{
    return this.http.delete(this.baseurl+'category/deleteCategory/'+id,this.httpOptions)
  }
  updateCategory(id, fd) : Observable<any>{
    return this.http.patch(this.baseurl+'category/updateCategory/'+id,fd,this.httpOptions)
  }




}
