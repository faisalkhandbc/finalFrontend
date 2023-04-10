import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Food } from 'src/app/model/food';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-takeaway',
  templateUrl: './takeaway.component.html',
  styleUrls: ['./takeaway.component.css']
})
export class TakeawayComponent {
  public fooditems:Food[]|undefined;
  public len: any;
  public myitem!:Food;
  public errorMessage: any;
  public styl: any;
  public loading: any = true;
  icon=faShoppingCart;
  info=faInfoCircle

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
}
