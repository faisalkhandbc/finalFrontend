import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Feedback } from 'src/app/model/feedback';
import { data } from 'jquery';
import { Customer } from 'src/app/model/customer';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.css']
})
export class ViewfeedbackComponent implements OnInit {
  
  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public loading:any= true;
  icon=faTrash

  feedbackList:Feedback[]|undefined;

  constructor(private router: Router, private adminService: AdminService) { }


  ngOnInit(): void {
    this.loading = true;
    this.check();
    
    this.getData()
  }

  getData() {
    this.adminService.getAllfeedback().subscribe(
      (data)=>{
        console.warn(data);
        if(data){
          this.loading=false
          this.feedbackList=data
        }
      }
    )
  }

  check() {
    this.adminService.check().subscribe(
      data => {
        console.log(data);
      }
    ) 
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

  viewuser(item:Feedback) {
    this.adminService.setUserid(item._id);
    this.router.navigate(['/admin/viewuser']) 
  }

  deletefeedback(item:any) {
    // //console.log("delete");
    //console.log(item);
    this.loading = true
    this.adminService.deleteFeedback(item._id).subscribe(
      data => {
        if (data) { 
          this.loading = false;
          this.setMessage("successfully feedback deleted", "#f04747");
          this.getData()
        }
        if (!data) {
          this.setMessage(data['errormsg'], "#f04747");
        } 
      }
    )
  } 

  deleteProduct(id:number){

  }
}