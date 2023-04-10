import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { cssNumber, data } from 'jquery';
import { Food } from 'src/app/model/food';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import {faShoppingCart, faInfoCircle, faL, faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public fooditems:Food[]|undefined;
  public len: any;
  public myitem!:Food;
  public errorMessage: any;
  public styl: any;
  public loading: any = true;
  icon=faShoppingCart;
  info=faInfoCircle

  categorySelect=''

  foodData:undefined|Food;
  productQuantity:number=1;
  addProductMessage: string | undefined;
  constructor(private customer:CustomerService, private webSocket:WebsocketService,private router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

    

    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    this.loading=true;
    this.check()
    this.getData() 

    this.webSocket.listen('foodcrudbyadmin').subscribe(
      data=>{
        this.getData()
      }
    )

    this.webSocket.listen('cart').subscribe(data=>{
      this.getData()
    })

    this.webSocket.listen('neworderplaced').subscribe(
      (data) => {
        this.getData()
      }
    )
  }

  check(){

  }
  getData(){
    this.customer.getAllFood().subscribe((data)=>{
      if(data){
        this.loading=false;
        this.fooditems=data
        console.warn(data)
      }
    })
  }

  addtoCart(item:Food,increment:boolean = true){
    // this.customer.addtocart(item).subscribe(data=>{
    //   this.addProductMessage="Food added to cart"
    // });
    this.customer.addtocart(item,increment);
    this.addProductMessage = "Food added to cart"

    this.getData()

    setTimeout(()=>{
      this.addProductMessage=undefined
    }, 3000)
  }
 
  nonveg(){
    this.customer.getnonveg().subscribe((data:any)=>{
      console.log(data)
      this.fooditems=data
    })
  }

  veg(){
    this.customer.getveg().subscribe((data:any)=>{
      console.log(data)
      this.fooditems=data
    })
  }

  searchFood(food:NgForm){
    console.log(JSON.stringify(food.value))
  }
  drinks(){
    this.customer.getdrinks().subscribe((data:any)=>{
      console.log(data)
      this.fooditems=data
    })
  }

  dessert(){
    this.customer.getdessert().subscribe((data:any)=>{
      console.log(data)
      this.fooditems=data
    })
  }
}
