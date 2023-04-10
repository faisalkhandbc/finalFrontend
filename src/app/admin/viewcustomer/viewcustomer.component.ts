import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  
  public customers: Customer[] | undefined;
  public errorMessage: any;
  public styl: any;
  public loading:any= true;
  
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.check();
    this.getData();
  }

  getData() {
    this.adminService.getAlluser().subscribe(
      data => {
     console.warn(data);
     this.customers=data
     this.loading=false
     this.getData()
      }
    )
  }

  check() {
    this.adminService.check().subscribe(
      data => {
        //console.log(data);
      }
    )
  }


  block(user:any) {
    var userid = user._id;
    this.adminService.blockuser(userid).subscribe(
      data => {
        if (data) {
          this.setMessage("successfully blocked user", "#f04747");
        }
        if (!data) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        this.getData();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        //console.log(error);
      }
    )
  }

  unblock(user:any) {
    var userid = user._id;
    this.adminService.unblockuser(userid).subscribe(
      data => {
        if (data) {
          this.setMessage("successfully unblocked user", "#43b581");
        }
        if (!data) {
          this.setMessage(data['errormsg'], "#f04747");
        }
        this.getData();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.authService.logoutUser();
          this.router.navigate(['/error'])
        }
        //console.log(error);
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
  
}
