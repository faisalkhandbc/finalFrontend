import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddfoodComponent } from './admin/addfood/addfood.component';
// import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';
// import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// import { AuthGuard } from './auth.guard';
import { HomeComponent } from './customer/home/home.component';
import { FeedbackComponent } from './customer/feedback/feedback.component';
import { CartComponent } from './customer/cart/cart.component';
import { MyordersComponent } from './customer/myorders/myorders.component';
import { RegisterComponent } from './admin/register/register.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AddfoodComponent } from './admin/addfood/addfood.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { SeefoodComponent } from './admin/seefood/seefood.component';
import { EditfoodComponent } from './admin/editfood/editfood.component';
import { AddfoodQuantityComponent } from './admin/addfood-quantity/addfood-quantity.component';
import { ViewcustomerComponent } from './admin/viewcustomer/viewcustomer.component';
import { VieworderComponent } from './customer/vieworder/vieworder.component';
import { OnecustomerviewComponent } from './admin/onecustomerview/onecustomerview.component';
import { ViewfeedbackComponent } from './admin/viewfeedback/viewfeedback.component';
import { VieworderhistoryComponent } from './admin/vieworderhistory/vieworderhistory.component';
import { QrcodeComponent } from './admin/qrcode/qrcode.component';
import { AuthGuard } from './auth/auth.guard';
import { EmptycartComponent } from './customer/empty-cart/empty-cart.component';
import { MenuComponent } from './customer/menu/menu.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';
import { OneorderviewComponent } from './admin/oneorderview/oneorderview.component';
import { LogInRegisterComponent } from './auth/log-in-register/log-in-register.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ContactusComponent } from './customer/contactus/contactus.component';
import { AboutComponent } from './customer/about/about.component';
import { SearchComponent } from './customer/search/search.component';
import { TakeawayComponent } from './customer/takeaway/takeaway.component';
import { CategoryComponent } from './customer/category/category.component';
 
const routes: Routes = [

  // { path: 'home', component: HomeComponent },
  // { path: 'menu', component: MenuComponent},
  // {path:'menu/category/:category', component:SearchComponent},
  // {path:'category', component:CategoryComponent},
  // {path:'takeaway', component:TakeawayComponent},
  // { path: 'feedback', component: FeedbackComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'myorders', component: MyordersComponent },
  // {path:'empty-cart', component:EmptycartComponent},
  // {path:'orderform', component:CustomerRegisterComponent},
  // {path:'contact', component:ContactusComponent},
  // {path:'about', component:AboutComponent},

  { path: 'home/:id', component: HomeComponent },
  { path: 'menu/:id', component: MenuComponent},
  // {path:'menu/category/:category', component:SearchComponent},
  {path:'category', component:CategoryComponent},
  {path:'takeaway', component:TakeawayComponent},
  { path: 'feedback/:id', component: FeedbackComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'myorders/:id', component: MyordersComponent },
  {path:'empty-cart/:id', component:EmptycartComponent},
  {path:'orderform/:id', component:CustomerRegisterComponent},
  {path:'contact/:id', component:ContactusComponent},
  {path:'about/:id', component:AboutComponent},

  // { path: '',   redirectTo: '/home', pathMatch: 'full' },
  
  
  { path: 'register', component: LogInRegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'reset', component:ResetComponent},
  {path:'reset-password', component:ResetpasswordComponent}, 
  {path: 'change-password', component: ChangePasswordComponent},

  //Admin
  { path: 'admin', component: AdminHomeComponent, canActivate:[AuthGuard]},
  { path: 'admin/addfood', component: AddfoodComponent, canActivate:[AuthGuard] },
  { path: 'admin/viewfood', component: SeefoodComponent, canActivate:[AuthGuard] },
  {path:'admin/oneorderview', component:OneorderviewComponent, canActivate:[AuthGuard]},
  { path: 'admin/editfood/:foodId', component: EditfoodComponent, canActivate:[AuthGuard] },
  { path: 'admin/addfoodquantity', component: AddfoodQuantityComponent, canActivate:[AuthGuard] },
  { path: 'admin/viewcustomers', component: ViewcustomerComponent, canActivate:[AuthGuard] },
  { path: 'admin/vieworders', component: VieworderComponent, canActivate:[AuthGuard] },
  { path: 'admin/viewcustomer', component: OnecustomerviewComponent, canActivate:[AuthGuard] },
  { path: 'admin/viewfeedback', component: ViewfeedbackComponent, canActivate:[AuthGuard] },
  { path: 'admin/orderhistory', component: VieworderhistoryComponent, canActivate:[AuthGuard] },
  { path: 'admin/qrcode', component: QrcodeComponent, canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
