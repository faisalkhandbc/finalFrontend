import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './customer/header/header.component';
import { HomeComponent } from './customer/home/home.component';
import { EmptycartComponent } from './customer/empty-cart/empty-cart.component';
import { CartComponent } from './customer/cart/cart.component';
import { FeedbackComponent } from './customer/feedback/feedback.component';
import { MyordersComponent } from './customer/myorders/myorders.component';
import { VieworderComponent } from './customer/vieworder/vieworder.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddfoodComponent } from './admin/addfood/addfood.component';
import { EditfoodComponent } from './admin/editfood/editfood.component';
import { AddfoodQuantityComponent } from './admin/addfood-quantity/addfood-quantity.component';
import { OneorderviewComponent } from './admin/oneorderview/oneorderview.component';
import { OnecustomerviewComponent } from './admin/onecustomerview/onecustomerview.component';
import { QrcodeComponent } from './admin/qrcode/qrcode.component';
import { SeefoodComponent } from './admin/seefood/seefood.component';
import { ViewcustomerComponent } from './admin/viewcustomer/viewcustomer.component';
import { ViewfeedbackComponent } from './admin/viewfeedback/viewfeedback.component';
import { VieworderhistoryComponent } from './admin/vieworderhistory/vieworderhistory.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LogInRegisterComponent } from './auth/log-in-register/log-in-register.component';
import { ResetpasswordDoneComponent } from './auth/resetpassword-done/resetpassword-done.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ResetComponent } from './auth/reset/reset.component';
import { IndexbarComponent } from './admin/indexbar/indexbar.component';
import { ServerdownComponent } from './error/serverdown/serverdown.component';
import { CustomerRegisterComponent } from './customer/customer-register/customer-register.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './admin/register/register.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './customer/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterNavComponent } from './admin/register-nav/register-nav.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './customer/contactus/contactus.component';
import { AboutComponent } from './customer/about/about.component';
import { SearchComponent } from './customer/search/search.component';
import { TakeawayComponent } from './customer/takeaway/takeaway.component';
import { CategoryComponent } from './customer/category/category.component';
import { SendFeedbackComponent } from './customer/send-feedback/send-feedback.component';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EmptycartComponent,
    CartComponent,
    FeedbackComponent,
    MyordersComponent,
    VieworderComponent,
    AdminNavComponent,
    AdminHomeComponent,
    AddfoodComponent,
    EditfoodComponent,
    AddfoodQuantityComponent,
    OneorderviewComponent,
    OnecustomerviewComponent,
    QrcodeComponent,
    SeefoodComponent,
    ViewcustomerComponent,
    ViewfeedbackComponent,
    VieworderhistoryComponent,
    ChangePasswordComponent,
    LogInRegisterComponent,
    ResetpasswordDoneComponent,
    ResetpasswordComponent,
    ResetComponent,
    IndexbarComponent,
    ServerdownComponent,
    CustomerRegisterComponent,
    RegisterComponent,
    LoadingComponent,
    MenuComponent,
    RegisterNavComponent,
    LoginComponent,
    ContactusComponent,
    AboutComponent,
    SearchComponent,
    TakeawayComponent,
    CategoryComponent,
    SendFeedbackComponent,
    MessageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
