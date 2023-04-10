import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import * as $ from 'jquery'
import { HttpErrorResponse } from '@angular/common/http';
import { faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public orders: any[]=[];
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public loading:any= true;

  select=''
  selectedItem=''

  paymentSelect=''

  icon=faTrash;
  eye=faEye
  constructor(private adminService:AdminService, private router:Router, private websocket:WebsocketService){}

  ngOnInit():void{
    this.loading=true;
    this.check();
    this.getOrder();

    this.websocket.listen('neworderplaced').subscribe((data)=>{
      this.getOrder();
    })

    this.websocket.listen('orderdelete').subscribe((data)=>{
      this.getOrder();
    })
    
  }

  disabling(){
    $(function(){
      let all=$('.payment').children();
      for (let index = 0; index < all.length; index++) {
        let element = (all[index] as HTMLInputElement).value
        if (element == "paid") {
          (all[index] as HTMLInputElement).disabled = true;
        }
      }
    })
  }

  getOrder() {
    this.adminService.getAllOrder().subscribe(
      data => {
        console.warn(data);
        this.loading=false;
        this.orders=data
        // this.getOrder()
        this.orders.reverse()
        // this.getOrder()
        // return
      })
  }
  check() {
    this.adminService.check().subscribe(
      data => {
        // console.log(data);
      }
    )
  }

  // doDisableing(){
  //   let all=$('.payment').children();
  //   for(let index=0; index<all.length; index++){
      
  //   }
  // }

  changeStatus(newstatus:any, item:any){

    this.select=newstatus.target.value
    // this.selectedItem=item.target.value

    console.log(this.select)

    this.adminService.updateOrderstatus({id:item._id, status:this.select, contact:item.usercontact}).subscribe((data:any)=>{
      console.log(data)
      console.log(JSON.parse(localStorage.getItem('orders')!));

      let newOrders=JSON.parse(localStorage.getItem('orders')!)
      let newCart:any={
        status:'placed'
      }

      if(newCart){
        newOrders.item.map((o:any)=>{
          if(o.orders._id!=item.orders._id){
            newCart.item.push(o);
            newCart.status=o.order.status
          }
        })

        localStorage.setItem('orders', JSON.stringify(newCart))
        this.getOrder()
      }
      
    })

    // this.select=newstatus.target.value
    // console.log(this.select)
    // newstatus=this.select

    // let items=localStorage.getItem('status')
    // console.log(item)
    // console.log(items)
    // localStorage.setItem('status', JSON.stringify(items))
    // this.adminService.updateOrderstatus({id:item._id, status:newstatus, contact:item.usercontact}).subscribe((data:any)=>{
    //   console.log(data)
    //   if(data){
    //     localStorage.setItem('status', JSON.stringify(data))
    //     this.getOrder()
    //   }
    // })
  }


  deleteorder(item:any){
   this.adminService.deleteOrder(item._id).subscribe((data)=>{
    console.warn(data);
    this.loading=false;
    this.getOrder()    
   })
  }

  vieworder(item:any){
    this.adminService.setOrderid(item._id);
    this.adminService.getOneOrder(item._id).subscribe(data=>{
      console.log(data)
      this.router.navigate(['admin/oneorderview'])
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
  changePaymentStatus(newstatus:any, item:any){
    this.paymentSelect=newstatus.target.value;

    console.log(this.paymentSelect)
    this.adminService.updatePaymentstatus({id:item._id, paymentstatus:this.paymentSelect, contact:item.usercontact}).subscribe((data:any)=>{
      console.log(data['msg'])
      if (data['msg']) {
        this.setMessage(data['msg'], "#43b581");
        this.getOrder();
      }
      if (data['errormsg']) {
        this.setMessage(data['errormsg'], "#f04747");
      }
      
    })
  }

  generateQr(item:any){
    {
      if(item.status=="completed" || item.status=="picked up")
      {
        this.adminService.setQrcode(item._id);
        this.router.navigate(['/admin/qrcode'])
      }
      else
      {
        this.setMessage("order status must be completed", "#f04747");
      }
    }
  }

  viewuser(item:any){
    this.adminService.setUserid(item.userid);
    this.router.navigate(['/admin/viewuser'])
  }
}
