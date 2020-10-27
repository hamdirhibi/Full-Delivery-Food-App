import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string ; 
  password : string ; 
  constructor(private loginService : LoginService,
            public toastController: ToastrService,
            private router : Router 
    ) {}


   ngOnInit() {
   }

   login(){
      this.loginService.signIn(this.email, this.password).subscribe((data)=>{
          localStorage.setItem('access_token',data.token) ; 
          this.router.navigate(['/home']) ; 
      },
      (err) =>{ 
          this.toastController.warning(err.error,'Error ')
      }
      
      )
   }
  
}
