import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Food } from 'src/app/model/food';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  image:any;
  foodname:any;
  foodprice:any;
  foodqty:any; 
  public errorMessage: any;
  public styl :any;
  categorySelect:any

  constructor(private authService: AuthService, private router: Router,private adminService: AdminService) { }



  ngOnInit(): void {
    this.check()
  }
  check() {
    this.adminService.check().subscribe(
      data=>{
        console.log(data) 
      }
    )
  }

  onSelected(event:any){
    this.categorySelect=event.target.value;
    console.log(this.categorySelect)
  }

  onSubmit(f: NgForm) {
    console.log(f.value, this.categorySelect)
      this.adminService.addfood({...f.value, category:this.categorySelect}).subscribe(data=>{
      console.warn(data);
      console.warn(f);
      this.router.navigate(['/admin/viewfood'])
      
    })
  }

  selectImage(event:any) {
    // console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  qtychnage(event:any) {
    if (event.target.value < -1) {
      event.target.value= 0;
      this.foodqty=0;
    }
  }

  pricechnage(event:any) {
    if(event.target.value == "")
    {
      event.target.value= "";
      this.foodprice="";
    }
    if (event.target.value <= 0 && event.target.value!="") {
      event.target.value= 1;
      this.foodprice=1;
    }
  }

  setMessage(msg:any,color:any)
  {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }

  
}
