import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit{
  public orders!: any[];
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public customerid: any;
  public loading: any = true;
  public paymentAry: any = [];

  constructor(private customer:CustomerService, private webSocket:WebsocketService, private router:Router){}

  ngOnInit(): void {
    this.customerid = localStorage.getItem('customerid');
    this.check()
    this.getOrder();
    this.loading = true;

    this.webSocket.listen(this.customerid).subscribe(
      data=>{
        this.getOrder();

        this.setMessage("Order Status Updated", 'green');
      }
    )

    this.webSocket.listen('orderdelete').subscribe(
      data=>{
        this.getOrder()
      }
    )
  }

  vieworder(items:any){
    this.customer.setOrderid(items._id)
    this.router.navigate(['/vieworder'])
  }

  check(){
    this.customer.check().subscribe(
      data=>{
        if(!data){
          if(error instanceof HttpErrorResponse){
            this.router.navigate(['/error'])
          }
        }
      }
    )
  }

  getOrder(){
    // this.customer.getAllOrder().subscribe(
    //   data=>{
    //     if(data){
    //       this.loading=false;
    //       // this.orders=data[]
    //       if(this.orders.length==0){
    //         this.empty=true
    //       }
    //       else{
    //         for (let index = 0; index < this.orders.length; index++) {
    //           const element = this.orders[index];
    //           if (element.paymentstatus == "paid") {
    //             this.paymentAry.push(true)
    //           }
    //           else {
    //             this.paymentAry.push(false)
    //           }
    //         }
    //       }
    //     }else{
    //       this.setMessage("Error", "#f04747");
    //       this.router.navigate(['/error'])
    //     }
    //   }
    // )
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

  // paytm = {
  //   MID: data.MID,
  //   WEBSITE: data.WEBSITE,
  //   INDUSTRY_TYPE_ID: data.INDUSTRY_TYPE_ID,
  //   CHANNEL_ID: data.CHANNEL_ID,
  //   CALLBACK_URL: data.CALLBACK_URL
  // };

  // makepayment(item: { userid: any; contact: any; useremail: any; _id: any; total: { toString: () => any; }; }) {
  //   this.loading = true
  //   this.paytm['CUST_ID'] = item.userid
  //   this.paytm['MOBILE_NO'] = item.contact
  //   this.paytm['EMAIL'] = item.useremail
  //   this.paytm['ORDER_ID'] = item._id
  //   this.paytm['TXN_AMOUNT'] = item.total.toString()

  //   // console.log(localStorage.getItem('token'));
  //   this.submitForm()
  // }

  makepayment(item:any){

  }

  submitForm() {

    // this.http.post(data.PAYMENT_URL, this.paytm)
    //   .subscribe((res: any) => {
    //     // As per my backend i will get checksumhash under res.data

    //     this.paytm['CHECKSUMHASH'] = res.data;
    //     this.paytm['ORDER_ID'] = res.oid

    //     // than i will create form
    //     this.createPaytmForm();
    //   });
  }

  createPaytmForm(){
    
  }
}
