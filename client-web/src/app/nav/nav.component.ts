import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(private socket: Socket) {}

  ngOnInit() {
    this.getMessage();
  }
  // get new notification
  getMessage() {
    return this.socket.fromEvent("notif").subscribe((data: any) => {
      this.toast();
    });
  }
  //show toast
  toast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 7000);
  }
}
