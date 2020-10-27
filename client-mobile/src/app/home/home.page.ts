import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
  MenuController,
} from "@ionic/angular";
import { Salade, ingredient } from "../Interfaces/ingredient";
import { DatePipe } from "@angular/common";
import { LoginService } from "../services/login.service";
import { environment } from "src/environments/environment";
import { ProductService } from "../services/product.service";
import { product } from "../Interfaces/Product";
import { User } from "../Interfaces/User";
import { CategoryService } from "../services/category.service";
import { OrderService } from "../services/order.service";

const apiUrl: string = environment.baseurl;
const domain: string = environment.domain;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  date3: Date;
  date: string;
  tel: string = "";
  date1: Date = null;
  date2: Date = null;
  choix = null;
  choix1 = null;
  choix2 = null;
  text: string;
  map: Map<string, string>;
  mpp: Map<number, number>;
  navigate: any;
  user: User;
  uploadUrl = apiUrl;
  products: product[];
  somme: number;
  id = 100;
  vegetables: Array<product> = new Array<product>();
  fruits: Array<product> = new Array<product>();
  juices: Array<product> = new Array<product>();
  //categories : Array<Category> = new Array<Category>() ;
  categories: Map<string, string> = new Map<string, string>();
  verifVegetable: boolean = false;
  verifJuice: boolean = false;
  verifFruit: boolean = false;
  orderAddress: string = "";
  notAvailableStyle = {
    filter: "brightness(0.2)",
    borderRadius: "50%",
  };
  NotcheckedStyle = {
    border: "",
    backgroundColor: "white",
    filter: "none",
  };
  checkedStyle = {
    borderRadius: "50%",
    filter: "hue-rotate(90deg)",
    border: "5px solid #32DF26",
  };

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private datePipe: DatePipe,
    private menu: MenuController,
    private loginService: LoginService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {
    //this.sideMenu();
    this.menu.enable(true, "first");
  }

  async ngOnInit() {
    setTimeout(() => {
      this.loginService.getCurrentUser().subscribe(async (data) => {
        this.user = await data.user;
      });
      //this.showSprinner();
      this.categoryService.getAllCategories().subscribe((data) => {
        data.forEach((elt) => {
          this.categories[elt._id] = elt.name;
        });
      });
      this.productService.getAllproducts().subscribe(async (data) => {
        this.products = await data;
        this.products.forEach((elt: product) => {
          elt.checked = false;
          if (this.categories[elt.category] === "vegetable") {
            elt.ctn = 1;
            this.vegetables.push(elt);
          }
          if (this.categories[elt.category] === "fruit") {
            elt.ctn = 1;

            this.fruits.push(elt);
          }
          if (this.categories[elt.category] === "juice") {
            elt.ctn = 1;

            this.juices.push(elt);
          }
        });
      });

      this.date3 = new Date();
      this.verif();
      this.date3.setDate(this.date3.getDate() + 1);
      this.date = this.datePipe.transform(
        Date.now() + 1000 * 60 * 60 * 24,
        "yyyy-MM-dd"
      );
    }, 500);
  }

  getid() {
    this.id++;
    return this.id;
  }
  async showSprinner(a) {
    let anc = this.tab;

    this.tab = 20;

    setTimeout(() => {
      this.tab = anc + a;
    }, 2000);
    this.tab = 20;
  }

  mode: string = "";

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Hellooo",
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  tab = 1;
  click = false;
  async presentToast(a, b) {
    const toast = await this.toastController.create({
      message: a,
      duration: 2000,
      color: b,
    });
    toast.present();
  }

  showdate() {}

  gotoback() {
    //this.showSprinner(-1);
    this.tab = this.tab - 1;
    this.verif();
  }
  gotonext() {
    let test = false;
    this.vegetables.forEach((element) => {
      if (element.checked === true) {
        test = true;
        this.verifVegetable = true;
      }
    });
    if (!test) this.verifVegetable = false;

    this.fruits.forEach((element) => {
      if (element.checked === true) {
        test = true;
        this.verifFruit = true;
      }
    });
    if (!test) this.verifFruit = false;

    this.juices.forEach((element) => {
      if (element.checked === true) {
        test = true;
        this.verifJuice = true;
      }
    });
    if (!test) this.verifJuice = false;

    if (test === false && this.tab == 3) {
      this.presentToast(" NOTHING SELECTED !! ", "warning");
      return;
    }

    this.tab = this.tab + 1;
    this.verif();
    this.getTotal();
  }
  async getelement(i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(document.getElementById(i.toString()));
      }, 100);
    });
  }
  sendCommand() {
    if (
      this.date1 == null ||
      this.choix == null ||
      this.tel.length < 1 ||
      this.orderAddress.length < 1
    ) {
      this.presentToast("You must fill all informations  ", "danger");
      return;
    } else {
      this.alertController
        .create({
          header: "Confirmer",
          message: "Confirm you Command  ",
          buttons: [
            { text: "cancel", role: "cancel" },
            {
              text: "Confirm",
              handler: () => {
                let quantities = [];
                let prods = [];
                let wei: number = 0;
                this.vegetables.forEach(async (elt) => {
                  if (elt.checked) {
                    quantities.push(elt.ctn);
                    prods.push(elt);
                    let curr = elt.unit_qte * elt.ctn;
                    if (elt.unit_id == "g") curr *= 0.001;
                    wei += curr;
                  }
                });
                this.fruits.forEach(async (elt) => {
                  if (elt.checked) {
                    quantities.push(elt.ctn);
                    prods.push(elt);
                    let curr = elt.unit_qte * elt.ctn;
                    if (elt.unit_id == "g") curr *= 0.001;
                    wei += curr;
                  }
                });
                this.juices.forEach(async (elt) => {
                  if (elt.checked) {
                    quantities.push(elt.ctn);
                    prods.push(elt);
                    let curr = elt.unit_qte * elt.ctn;
                    if (elt.unit_id == "g") curr *= 0.001;
                    wei += curr;
                  }
                });
                let choice;
                if (this.choix == 2) choice = "Card Payment";
                else choice = "Cash Payment";
                this.orderService
                  .addOrder({
                    author: this.user,
                    products: prods,
                    quantities: quantities,
                    total: this.somme,
                    deleveryDate: this.date1,
                    phone: this.tel,
                    paymentMethod: choice,
                    freeSpace: this.text,
                    weight: wei,
                    orderAddress: this.orderAddress,
                  })
                  .subscribe((data) => {
                    this.presentToast(
                      "Your Command has been sent succefully ",
                      "success"
                    );
                    this.clearModel();
                    this.tab = 1;
                    this.orderService.send_order({
                      author: this.user,
                      products: prods,
                      quantities: quantities,
                      total: this.somme,
                      deleveryDate: this.date1,
                      phone: this.tel,
                      paymentMethod: choice,
                      freeSpace: this.text,
                      weight: wei,
                      orderAddress: this.orderAddress,
                    });
                    this.orderService.send_order("new");
                  });
              },
              //envoyer commande
            },
          ],
        })
        .then((alertctr) => {
          alertctr.present();
        });
    }
  }
  clearModel() {
    this.products.forEach((element) => {
      element.checked = false;
    });
  }
  checknotAvailable() {
    this.vegetables.forEach(async (element) => {
      if (element.available === false) {
        // document.getElementById(element._id.toString()).style.filter= 'brightness(0.4)';          ;
        document.getElementById(element._id.toString()).style.filter =
          "hue-rotate(90deg)";
        document.getElementById(element._id.toString()).style.borderRadius =
          "50%";
      }
    });
  }
  verif() {
    this.vegetables.forEach(async (element) => {
      if (element.checked === true) {
        await this.getelement(element._id);
        if (document.getElementById(element._id.toString())) {
          //       document.getElementById(element._id.toString()).style.filter= 'opacity(25%)';          ;
          document.getElementById(element._id.toString()).style.borderRadius =
            "50%";
          document.getElementById(element._id.toString()).style.border =
            "5px solid #32DF26";

          return true;
        }
      }
    });

    this.juices.forEach(async (element) => {
      if (element.checked === true) {
        await this.getelement(element._id);
        if (document.getElementById(element._id.toString())) {
          //   document.getElementById(element._id.toString()).style.filter= 'hue-rotate(90deg)';          ;
          document.getElementById(element._id.toString()).style.border =
            "5px solid #32DF26";
          document.getElementById(element._id.toString()).style.borderRadius =
            "50%";
          return true;
        }
      }
    });
    this.fruits.forEach(async (element) => {
      if (element.checked === true) {
        await this.getelement(element._id);
        if (document.getElementById(element._id.toString())) {
          //     document.getElementById(element._id.toString()).style.filter= 'hue-rotate(90deg)';          ;
          document.getElementById(element._id.toString()).style.border =
            "5px solid #32DF26";
          document.getElementById(element._id.toString()).style.borderRadius =
            "50%";
          return true;
        }
      }
    });
  }

  gotoFirst() {
    this.tab = 1;
    this.verif();
  }
  removeElement(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }
  getTotal() {
    let n: number = 6.0;
    this.vegetables.forEach((element) => {
      if (element.checked === true) n = n + element.price * element.ctn;
    });
    this.juices.forEach((element) => {
      if (element.checked === true) n = n + element.price * element.ctn;
    });
    this.fruits.forEach((element) => {
      if (element.checked === true) n = n + element.price * element.ctn;
    });

    this.somme = n;
  }

  getString(ch) {
    return ch.substr(0, ch.match(/\d/).index);
  }

  upbase(id) {
    this.vegetables.forEach((element) => {
      if (id == element._id.toString()) {
        element.ctn++;
      }
    });
    this.fruits.forEach((element) => {
      if (id == element._id.toString()) {
        element.ctn++;
      }
    });
    this.juices.forEach((element) => {
      if (id == element._id.toString()) {
        element.ctn++;
      }
    });
    this.getTotal();
  }

  downbase(id) {
    this.vegetables.forEach((element) => {
      if (id == element._id.toString()) {
        if (element.ctn > 1) element.ctn--;
      }
    });
    this.fruits.forEach((element) => {
      if (id == element._id.toString()) {
        if (element.ctn > 1) element.ctn--;
      }
    });
    this.juices.forEach((element) => {
      if (id == element._id.toString()) {
        if (element.ctn > 1) element.ctn--;
      }
    });

    this.getTotal();
  }

  choseVegetable(a) {
    this.vegetables.forEach((element) => {
      if (a === element._id) {
        if (element.checked === true) {
          document.getElementById(element._id.toString()).style.border = "";
          document.getElementById(
            element._id.toString()
          ).style.backgroundColor = "white";
          document.getElementById(element._id.toString()).style.filter = "none";
          element.checked = false;
        } else {
          if (element.available == true) {
            document.getElementById(a).style.borderRadius = "50%";
            //  document.getElementById(element._id.toString()).style.filter= 'hue-rotate(90deg)';          ;
            document.getElementById(a).style.border = "5px solid #32DF26";

            element.checked = true;
          }
        }
      }
    });
  }

  choseFruit(a) {
    this.fruits.forEach((element) => {
      if (a === element._id) {
        if (element.checked === true) {
          document.getElementById(element._id.toString()).style.border = "";
          document.getElementById(
            element._id.toString()
          ).style.backgroundColor = "white";
          document.getElementById(element._id.toString()).style.filter = "none";

          element.checked = false;
        } else {
          if (element.available == true) {
            document.getElementById(a).style.border = "5px solid #32DF26";
            document.getElementById(a).style.borderRadius = "50%";
            //    document.getElementById(element._id.toString()).style.filter= 'hue-rotate(90deg)';          ;

            element.checked = true;
          }
        }
      }
    });
  }
  choseJuice(a) {
    this.juices.forEach((element) => {
      if (a === element._id) {
        if (element.checked === true) {
          document.getElementById(element._id.toString()).style.border = "";
          document.getElementById(
            element._id.toString()
          ).style.backgroundColor = "white";
          document.getElementById(element._id.toString()).style.filter = "none";

          element.checked = false;
        } else {
          if (element.available == true) {
            document.getElementById(a).style.border = "5px solid #32DF26";
            document.getElementById(a).style.borderRadius = "50%";
            //   document.getElementById(element._id.toString()).style.filter= 'hue-rotate(90deg)';          ;

            element.checked = true;
          }
        }
      }
    });
  }

  // sideMenu()
  // {
  //   this.navigate =
  //   [
  //     {
  //       title : "Home",
  //       url   : "/home",
  //       icon  : "home"
  //     },
  //     {
  //       title : "Chat",
  //       url   : "/chat",
  //       icon  : "chatboxes"
  //     },
  //     {
  //       title : "Contacts",
  //       url   : "/contacts",
  //       icon  : "contacts"
  //     },
  //   ]
  // }
}
