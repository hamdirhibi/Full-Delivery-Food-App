import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { HistoricComponent } from './historic/historic.component';
import { OrderDetailComponent } from './home/order-detail/order-detail.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {
    path : '' , component : LoginComponent
  },
  {
    path :'home' , component : HomeComponent
  },
  {
    path : 'login' , component : LoginComponent
  },
  {
    path : 'products' , component : ProductsComponent
  },
  {
    path : 'products/update' , component : UpdateProductComponent
  },
  {
    path : 'categories' , component : CategoriesComponent
  },
  {
    path : 'historic' , component : HistoricComponent
  },
  {
    path : 'order-details' , component : OrderDetailComponent
  },
  {
    path : '**' , component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
