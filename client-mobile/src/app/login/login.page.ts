import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  activeMenu: string;
  email : string ; 
  password : string ; 


  constructor(public menu: MenuController,
            private loginService : LoginService,
            public toastController: ToastController,
            private router : Router 

    ) {
    this.menu.enable(false , 'first');
  }


   ngOnInit() {
   }

   login(){
      this.loginService.signIn(this.email, this.password).subscribe((data)=>{
          localStorage.setItem('access_token',data.token) ; 
          console.log(data.token)
          this.router.navigate(['/home']) ; 
      },
      (err) =>{ 
        console.log(err) ; 
          this.presentToast(err.error,"warning") ;
      }
      
      )
   }
  async presentToast(a,b) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000,
      color : b
    });
    toast.present();
  }

}
