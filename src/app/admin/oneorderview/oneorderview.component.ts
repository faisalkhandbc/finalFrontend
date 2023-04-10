import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Food } from 'src/app/model/food';
import { Order } from 'src/app/model/order';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-oneorderview',
  templateUrl: './oneorderview.component.html',
  styleUrls: ['./oneorderview.component.css']
})
export class OneorderviewComponent implements OnInit {

  public id: any;
  public errorMessage: any;
  public styl: any;

  item: Food[]|undefined;
  total: any;
  arr!: any[];
  empty!: any[];
  public loading: any = true;
  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check();
    this.getData();
  }

  getData(){
    // this.adminService.getOneOrder()
    
    this.id=this.adminService.getOrderid();
    
    if(this.id==undefined){
      this.router.navigate(['/admin'])
    }
    else{
      this.adminService.getOneOrder(this.id).subscribe(data=>{
        console.log(data)
        this.loading=false;
        // this.item
      })
    }
  }

  getoneOrder(item:any){
    this.adminService.getOneOrder(item._id).subscribe(data=>{
      console.warn(data);
      
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

  check() {
    this.adminService.check().subscribe(
      data => {
        ////console.log(data);
        if (!data) {

          if (error instanceof HttpErrorResponse) {
            this.adminService.logoutUser();
            this.router.navigate(['/error'])
            ////console.log(error);
          }
        }
      },

    )
  }
}
