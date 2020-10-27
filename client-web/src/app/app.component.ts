import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';




const apiUrl = environment.baseurl ; 



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'Moez';
  constructor(){
    localStorage.setItem('apiUrl',apiUrl);
  }
}
