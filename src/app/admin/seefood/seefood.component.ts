import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Food } from 'src/app/model/food';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import { data } from 'jquery';
@Component({
  selector: 'app-seefood',
  templateUrl: './seefood.component.html',
  styleUrls: ['./seefood.component.css'],
})
export class SeefoodComponent implements OnInit {

  fooditems:Food[]|undefined;
  public len: any;
  public errorMessage: any;
  public styl: any;
  public loading:any= true;
 icon=faTrash;
 edit=faEdit
  constructor(private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
   this.getFood()
   this.loading = true;
   if(this.adminService.getMessage())
    {
      var x = this.adminService.getMessage();
      this.setMessage(x.msg,x.color)
      // //console.log(this.authService.getMessage());
    }
  }

  getFood() {
    this.adminService.getAllFood().subscribe(
      data => {
        if (data) {
          console.warn(data);
          
          this.loading = false;
          // this.fooditems = data;
          this.fooditems=data
          // //console.log(data['msg']);
        }
      } 
    )
    // //console.log();
  }
  addfooditem(item:Food) {
    // //console.log("add");
    // //console.log(item);
    this.adminService.setFood(item);
    this.router.navigate(['/admin/addfoodqty'])
  }

  editfood(item:Food){
    this.adminService.setFood(item)
    this.router.navigate([`/admin/editfood/${item._id}`])
  }

  deletefood(item:Food){
    this.adminService.deleteFood(item._id).subscribe(data=>{
      console.log(data)
      this.getFood()
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
}
