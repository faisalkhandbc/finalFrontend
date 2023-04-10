import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';

import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addfood-quantity',
  templateUrl: './addfood-quantity.component.html',
  styleUrls: ['./addfood-quantity.component.css']
})
export class AddfoodQuantityComponent implements OnInit {
 
  public food: any;
  public errorMessage: any;
  public styl :any;
  public loading:any= true;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
   this.loading = true;
    this.check();
    // if (this.adminService.getFood()) {
    //   this.loading = false;
    //   this.food = this.adminService.getFood();
    // }
    // else {
    //   this.router.navigate(['/admin/seefood'])
    // }
  }
  check() {
    this.adminService.check().subscribe(
      data=>{

      }
    )   
  }


  onSubmit(f:NgForm) {
    if(this.food.foodqty<0)
    {
      this.food.foodqty=0;
    }
    this.adminService.editfood(this.food).subscribe(
      data=>{
        this.adminService.setMessage("Quantity Changed", "green"),
        this.router.navigate(['/admin/seefood'])
      }
    )
  }
  qtychnage(event:any) {
    if (event.target.value < 0) {
      event.target.value= 0;
      this.food.foodqty = 0;
    }
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
}
