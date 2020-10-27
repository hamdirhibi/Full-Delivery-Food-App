import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' , canActivate : [AuthGuardService]},
  { path: 'loading', loadChildren: './loading/loading.module#LoadingPageModule' , canActivate : [AuthGuardService]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' , canActivate : [AuthGuardService]},
  { path: 'consult-order', loadChildren: './consult-order/consult-order.module#ConsultOrderPageModule', canActivate : [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
