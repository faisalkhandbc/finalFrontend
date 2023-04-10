import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs'
import { Food } from '../model/food';
import { Order } from '../model/order';
import { Cart } from '../model/cart';
import { Feedback } from '../model/feedback';


function _window():any{
  return window
}


// const baseUri = "http://localhost:3000/customer/";
// const headers = new HttpHeaders({'Content-Type', 'application/json'});
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  get nativeWindow():any{
    return window
  }

  // private baseUri = "http://localhost:3000/customer/";
  private baseUri="https://finalbackend-production-a3d3.up.railway.app/customer/"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
  public avail: boolean = false;
  public msg: string = "";
  public orderid:any;
  public count!:number;
  public toster:any = {};
  
  public USER_KEY = 'customer';
  constructor(private http: HttpClient, private router: Router) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  check() {
    return this.http.get(this.baseUri + "check", { headers: this.headers });
  }

  register(body:any){
    console.log(body)
    return this.http.post(this.baseUri+'/register',body, {observe:'body', headers: new HttpHeaders().append('Content-Type', 'application/json')})
  }

  getAllFood(){
    return this.http.get<Food[]>(this.baseUri + "getallfooditem", { headers: this.headers });
  }

  getfoodbyname(){
    return this.http.get(this.baseUri+"getfoodbyName", {headers:this.headers})
  }

  getnonveg(){
    return this.http.get(this.baseUri+"/getnonveg", {headers:this.headers})
  }

  getveg(){
    return this.http.get(this.baseUri+"/getveg", {headers:this.headers})
  }

  getdrinks(){
    return this.http.get(this.baseUri+"/getdrinks", {headers:this.headers})
  }

  getdessert(){
    return this.http.get(this.baseUri+"/getdessert", {headers:this.headers})
  }
  getfoodbycategory(category:string){
    return this.http.get<Food[]>(this.baseUri+`getfoodbycategory/+${category}`, {headers:this.headers})
  }

  getfeedbacks(){
    return this.http.get<Feedback[]>(this.baseUri+'/getfeedback', {headers:this.headers})
  }

  addtocart(body: Food,increment:boolean = true) {
    console.log(body);
    const cart = JSON.parse(localStorage.getItem("cart")!) as Cart;
    if (cart == null){
      localStorage.setItem("cart",JSON.stringify({items:[{food:body,quantity:1}],total:body.foodprice}))
    }else{
      console.log(cart);
      let itemExists = false;
      cart.items.map((o,i)=>{
        if (o.food._id == body._id){
          if (increment){
            cart.items[i].quantity+= 1;
            cart.total += body.foodprice;  
          }else if (!increment  && cart.items[i].quantity != 1){
            cart.items[i].quantity-= 1;
          cart.total -= body.foodprice;
          }
          localStorage.setItem("cart",JSON.stringify(cart))
          itemExists = true;
        }
      });
      if (!itemExists){
        cart.items.push({food:body,quantity:1});
        cart.total+=body.foodprice
        localStorage.setItem("cart",JSON.stringify(cart))
        console.log("NEW ITEM IN CART")
      }
    }
    // return this.http.post(this.baseUri + "addtocart", body, {
    //   observe: 'body',
    //   headers: new HttpHeaders().append('Content-Type', 'application/json')
    // });
  }

//  placeOrder

  // getCount()
  // {
  //   return this.http.get<number>(this.baseUri + "getcount", { headers: this.headers });
  // }

  getcart(): Cart
  {
    return JSON.parse(localStorage.getItem("cart")!);
    // return this.http.get<Cart>(this.baseUri + "getcart", { headers: this.headers });
  }

  // deleteFromCart(body: any)
  // {
  //   return this.http.post(this.baseUri + "deletefromcart", body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   }); 
  // }


  paytm(body: any) {
    return this.http.post(this.baseUri+"paytm", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  placeOrder(body: any) {
    return this.http.post(this.baseUri+"placeorder", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  // getAllOrder(){
  //   return this.http.get<Order[]>(this.baseUri + "getalluserorders", { headers: this.headers });
  // }

  getAllOrder(){this.check()
    const contact = localStorage.getItem("contact");
    console.log("GETALLUSERSORDERs",contact);
      return this.http.get<Order[]>(this.baseUri + "getalluserorders/"+contact, { headers: this.headers});

    //  return JSON.parse(localStorage.getItem("orders")! ?? []);
    
    }

  setOrderid(id:any)
  {
    this.orderid = id;
  }

  getOrderid()
  {
    return this.orderid;
  }

  getOneOrder(id:string)
  {
    return this.http.get(this.baseUri + "getoneorder/" + id, { headers: this.headers });
  }

  feedback(body: any) {
    return this.http.post(this.baseUri + "sendfeedback", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  setCount(c:number)
  {
    this.count=c;
  }

  Count()
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

  checkout(stripeToken:any){
    return this.http.post<any>(this.baseUri+'checkout',{token:stripeToken}, {headers:this.headers})
  }

  changepayment(id:string){
    return this.http.post(this.baseUri+'updatepayment', id, {headers:this.headers})
  }
}
