import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css']
})
export class EmptycartComponent implements OnInit {
  public count:any;
  constructor(private router: Router, private customer: CustomerService) { }

  ngOnInit(): void {
    if(this.customer.Count()==undefined || this.customer.Count()!=0)
    {
      this.router.navigate(['/userhome']);
    }
    this.check();

  }


  check() {
    // this.customer.check().subscribe(
    //   data => {
    //     //console.log(data);
    //   },
    //   (error) => {
    //     if (error instanceof HttpErrorResponse) {
    //       this.authService.logoutUser();
    //       this.router.navigate(['/error'])
    //     }
    //     //console.log(error);
    //   }
    // )
  }

}
