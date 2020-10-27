import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { OrderService } from './services/order.service';

const apiUrl = environment.baseurl ; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private orderService : OrderService,
    private toastr : ToastController
    ) {
    this.sideMenu();
    this.initializeApp();
    localStorage.setItem('apiUrl',apiUrl);
    // this.orderService.newOrderJoined().subscribe(data=>{
    //   this.presentToast("new order ","success")  ;  
    // })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async presentToast(a,b) {
    const toast = await this.toastr.create({
      message: a,
      duration: 2000,
      color : b
    });
    toast.present();
  }
 


  sideMenu()
  {
    this.navigate =
    [
      {
        title : "HOME",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "MY ORDERS",
        url   : "/orders",
        icon  : "reorder"
      },
      {
        title : "LOG OUT",
        url   : "/login",
        icon  : "log-out"
      },
      {
        title : "REGISTER ",
        url   : "/signup",
        icon  : "person-add"
      },
    ]
  }
}
