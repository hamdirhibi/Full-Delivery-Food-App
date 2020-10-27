import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { FormsModule } from "@angular/forms";
import { NavComponent } from "./nav/nav.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { JwPaginationComponent } from "jw-angular-pagination";
import { CustomMaterialModule } from "./custom-material/custom-material.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { CategoriesComponent } from "./categories/categories.component";
import { UpdateProductComponent } from "./products/update-product/update-product.component";
import { OrderDetailComponent } from "./home/order-detail/order-detail.component";
import { HistoricComponent } from "./historic/historic.component";
import { FooterComponent } from "./footer/footer.component";
import { ErrorComponent } from "./error/error.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "../environments/environment";

const config: SocketIoConfig = { url: environment.baseurl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    NavComponent,
    JwPaginationComponent,
    ConfirmDialogComponent,
    CategoriesComponent,
    UpdateProductComponent,
    OrderDetailComponent,
    HistoricComponent,
    FooterComponent,
    ErrorComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent],
})
export class AppModule {}
