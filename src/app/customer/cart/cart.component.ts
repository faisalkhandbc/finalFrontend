import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { data } from 'jquery';
import { Cart } from 'src/app/model/cart';
import { Food } from 'src/app/model/food';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  items: Food[]=[];
  arr:Cart|undefined;
  total!:number;
  public message:any;
  public style:any;
  public loading:any=true
  errorMessage: null | undefined;

  public id:any

  icon=faTrash;
  cartData:Cart|undefined
  constructor(private route:ActivatedRoute,private router:Router, private customer:CustomerService, private webSocket:WebsocketService){}

  ngOnInit(): void {
    // if(this.customer.Count==0){
    //   this.customer.setCount(0);
    //   this.router.navigate(['/empty-cart'])
    // }

    // this.webSocket.listen('cart').subscribe(
    //   (data)=>{
    //     this.getData()
    //   }
    // )

    this.id=this.route.snapshot.paramMap.get('id')
    this.loading=true;
    this.getData();
  }
  
  getData(){
    // this.customer.getcart().subscribe((data)=>{
    //   console.log(data,"getcart");
    //   this.loading=false;
    //   this.cartData=data;
    //   console.log(this.cartData);
    // })
    this.cartData = this.customer.getcart();
    console.log(this.cartData)
    this.loading = false;

    if(this.cartData==null){
      this.router.navigate(['/empty-cart'])
    }
  }
  addtoCart(item:Food,increment:boolean = true){
    // this.customer.addtocart(item).subscribe(data=>{
    //   this.addProductMessage="Food added to cart"
    // });
    this.customer.addtocart(item,increment);
    this.getData()
  }

  delete(item:any){
    console.log(item);
    // localStorage.setItem('order', item)
    const cart = JSON.parse(localStorage.getItem("cart")!)
    let newCart :any = {
      items: [],
      total:0
    };
    if (cart){
      cart.items.map((p:any)=>{
        if (p.food._id != item.food._id){
          newCart.items.push(p);
          newCart.total += p.food.foodprice * p.quantity;
        }
      })
      localStorage.setItem("cart",JSON.stringify(newCart))

      this.getData()
    }
    // localStorage.removeItem("cart")
    // this.getData()
  }

  placeorder(){
    // this.router.navigate(['/orderform/${}'])
    this.router.navigate([`/orderform/${this.id}`])
  }
}
 