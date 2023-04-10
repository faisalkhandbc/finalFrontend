import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Admin, adminLogin } from '../model/admin';
import { Food } from '../model/food';
import {Observable} from 'rxjs'
import { Feedback } from '../model/feedback';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { signUp } from '../model/signup';



@Injectable({
  providedIn: 'root'
})
export class AdminService {



// private baseUri = "http://localhost:3000/admin";
private baseUri="https://finalbackend-production-a3d3.up.railway.app/admin"
private headers = new HttpHeaders().set('Content-Type', 'application/json')

public toster:any = {};
public avail: boolean = false;
public msg: string = ""; 
public count :any;
  public orderid:any;
  public userid:any;
  private food: any; 
  public qrcode:any;

  public customError={
    status:'500',
    message:"Sorry! Something Went wrong"
  }

  constructor(private http:HttpClient, private router:Router) {  }

  
  register(body: any) {
    return this.http.post(this.baseUri+'/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
 
  login(body: any) {
    return this.http.post(this.baseUri+'/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  check() {
    return this.http.get(this.baseUri + "/check", { headers: this.headers });
  } 

  reset(body: any) {
    return this.http.post(this.baseUri+'/reset', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  resetpassworddone(body: any) {

    return this.http.post(this.baseUri+'/reset-password-done', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  changepassword(body: any) {
    return this.http.post( this.baseUri+'/changepassword', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  setCount(c:any)
  {
    this.count=c;
  }

  getCount()
  {
    return this.count;
  }


  setMessage(msg:any,color:any)
  {
    this.toster.msg = msg;
    this.toster.color =color;
    setTimeout(() => {
      this.toster = {};
    }, 4000);
  }

  getMessage()
  {
    return this.toster; 
  }

  addfood(body: any) {
    return this.http.post(this.baseUri + "/addfood", body);
  }

  getAllFood() {
    return this.http.get<Food[]>(this.baseUri + "/getallfooditem", { headers: this.headers });
  }
 
  setFood(item: Food) {
    this.food = item;
  }

  getFood(foodId:string) { 
    return this.http.get(this.baseUri + `/food/${foodId}`);
  }


  editfood(body: Food) {
    return this.http.post<Food>(this.baseUri + "/editfood", body);
  }

  editfoodwithimage(body: any) { 
    return this.http.post(this.baseUri + "/editfoodwithimage", body);
  }

  deleteFood(id: string) {
    return this.http.delete<Food>(this.baseUri + "/deletefood/" + id, { headers: this.headers });
  }


  getAlluser() {
    return this.http.get<Customer[]>(this.baseUri + "/getalluser", { headers: this.headers });
  }

  blockuser(id: string) {
    return this.http.delete(this.baseUri + "/blockuser/" + id, { headers: this.headers });
  }
  unblockuser(id: string) {
    return this.http.delete(this.baseUri + "/unblockuser/" + id, { headers: this.headers });
  }

  getAllOrder() {
    return this.http.get<Order[]>(this.baseUri + "/getallorders", { headers: this.headers });
  }

  updateOrderstatus(body:any) {
    return this.http.post(this.baseUri + "/updateorderstatus", body);
  }

  deleteOrder(id: string)
  {
    return this.http.delete(this.baseUri + "/deleteorder/" + id, { headers: this.headers });
  }

  setOrderid(id: string)
  {
    this.orderid = id;
  }

  getOrderid()
  {
    return this.orderid;
  }

  getOneOrder(id:string)
  {
    return this.http.get<Order>(this.baseUri + "/getoneorder/" + id, { headers: this.headers });
  }

  setUserid(id: any)
  {
    this.userid = id;
  }

  getUserid()
  {
    return this.userid;
  } 

  getOneUser(id: string)
  {
    return this.http.get(this.baseUri + "/getoneuser/" + id, { headers: this.headers });
  }

  getOrderHistory(date: string)
  {
    return this.http.get<Order[]>(this.baseUri + "/getorderhistory/" + date, { headers: this.headers });
  }

  updatePaymentstatus(body:any)
  {
    return this.http.post(this.baseUri + "/updatepaymentstatus", body);
  }

  setQrcode(id: any)
  {
    this.qrcode = id;
  }

  getQrcode() 
  {
    return this.qrcode;
  }

  generateQrcode(id: string)
  {
    return this.http.get(this.baseUri + "/getqrcode/" + id, { headers: this.headers });
  }


  getAllfeedback()
  {
    return this.http.get<Feedback[]>((this.baseUri + "/getallfeedback"), { headers: this.headers })
  }

  deleteFeedback(id: string)
  {
    return this.http.delete<Feedback>(this.baseUri + "/deletefeedback/" + id, { headers: this.headers });
  }
}