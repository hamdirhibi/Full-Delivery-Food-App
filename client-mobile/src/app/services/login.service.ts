import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})



export class LoginService {


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
  

  // Sign-up
  signUp(user): Observable<any> {
    let api = this.baseurl+'user/signup';
    return this.http.post<any>(api, user) ; 
    
  }

  getCurrentUser() : Observable <any> {
    return this.http.get<any>(this.baseurl+'user/current',this.httpOptions2); 
  }


    // Sign-in
    signIn(email,password) {
      return this.http.post<any>(this.baseurl+'user/login', {email : email , password: password}) ; 
    }


    getToken() {
      return localStorage.getItem('access_token');
    }


  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }



  

}
