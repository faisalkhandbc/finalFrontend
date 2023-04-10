import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  paymentHandler:any=null
  public orders: any[] = [];
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public customerid: any;
  public loading: any = false;
  public paymentAry: any = [];

  public grand:any
  // public options:any
  isPaid: boolean = false;
  icon = faCreditCard
  item: any;

  public totalamount:number=0

  constructor(private customer: CustomerService, private webSocket: WebsocketService, private router: Router) { }

  ngOnInit(): void {

    this.check()
    this.loading = true;
    this.getOrder();
  }

  

  vieworder(items: any) {
    this.customer.setOrderid(items._id)
    this.router.navigate(['/vieworder'])
  }

  check() {
    this.customer.check().subscribe(
      data => {

      }
    )
  }


  getOrder() {

    this.customer.getAllOrder().subscribe((data: any) => {
      console.warn(data);
      if (data) {
        this.loading = false
        this.orders = data;

        if (this.orders.length == 0) {
          this.empty = true
        }
        else {
          for (let i = 0; i < this.orders.length; i++) {
            const element = this.orders[i];
            if (element.paymentstatus == "paid") {
              this.paymentAry.push(true)
            }
            else {
              this.paymentAry.push(false)
            }
          }
        }
      }

    })
  }


  setMessage(msg: any, color: any) {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }


  
  options = {
    "key": "rzp_test_8aIMIIRMvtXPDh", // Enter the Key ID generated from the Dashboard
    "amount": '5000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
}; 

payment(item:any){
  // this.customer.changepayment(item.id).subscribe((data:any)=>{
  //   if(data){
  //     // this.orders=data
  //     console.log(data)
  //   }
  // })
}
 

  makepayment(item: any) {

    this.totalamount=item.total

    this.grand=this.totalamount?.toString

    
    this.loading=true
    let rzp1=new this.customer.nativeWindow.Razorpay(this.options)
    rzp1.open()

    // if(rzp1.open()==true){
    //   this.item.paymentstatus=="Paid"
    // }

    this.payment(item.id)

};


  submitForm() {

  }

  createPaytmForm() {

  }
}
