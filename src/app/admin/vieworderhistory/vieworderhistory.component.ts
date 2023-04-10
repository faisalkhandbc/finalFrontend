import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { Order } from 'src/app/model/order';
@Component({
  selector: 'app-vieworderhistory',
  templateUrl: './vieworderhistory.component.html',
  styleUrls: ['./vieworderhistory.component.css']
})
export class VieworderhistoryComponent implements OnInit {

  public errorMessage: any;
  public styl: any;
  public fooditems: any[]=[];
  public date: any;
  public maxDate: any;
  public total: any = 0;
  public empty: any = false;
  public loading: any = true;
  public order!:any[]
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    var today = new Date();
    this.date = today.toJSON().slice(0, 10);
    this.maxDate = today.toJSON().slice(0, 10);
    this.check();
    this.getOrder();
  }

  getOrder() {
    console.log(new Date(this.date).toISOString());
   this.adminService.getOrderHistory(new Date(this.date).toISOString()).subscribe(data=>{
    console.log(data)
    this.order = data;
    this.order.map((o)=>{
      this.total +=o.total
    })
   })
  this.loading=false;
  }


  check() {
    this.adminService.check().subscribe(
      data => {
        //console.log(data);
      }
    )
  }

  changeDate() {
    if (this.date) {
      this.loading = true;
      this.getOrder()
    }
  }
}
