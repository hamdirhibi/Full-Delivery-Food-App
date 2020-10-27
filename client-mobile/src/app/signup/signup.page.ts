import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { User } from 'firebase';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user : User ; 
  fullname:  string ; 
  phone : number ;
  email : string ; 
  password : string ; 
  cofirmpassword : string ; 
  address : string ; 
  constructor(public menu: MenuController,
    public toastController: ToastController,
    private loginService: LoginService,
    private router : Router
    ) {
      this.menu.enable(false , 'first');
  }

  ngOnInit() {
  }

   
  register(){
    if (this.email.length==0 ||
      this.fullname.length==0 ||
      this.address.length==0 ||
      this.password.length==0 ||
      this.cofirmpassword.length==0 ||
      this.phone==0 ){
        this.presentToast("Missing arguments","warning"); 
      }

      if (this.cofirmpassword!=this.password){
        this.presentToast("No match passwords","warning"); 
      }

      this.loginService.signUp({
        fullName: this.fullname , 
        email : this.email , 
        phone : this.phone,
        password : this.password , 
        address : this.address,
        role : 'ROLE_CLIENT'
      })
      .subscribe((data)=>{
        this.presentToast("sucessuful registration","success") ; 
        console.log(data) ; 
        localStorage.setItem('userId',data) ; 
        this.router.navigate(['/login']) ; 
      },
      (err) =>{
          this.presentToast(err.error,"warning") ; 
      }) ; 
      
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
