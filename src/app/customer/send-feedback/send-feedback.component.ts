import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent {
  public errorMessage: any;
  public styl: any;

  constructor(private customerService:CustomerService, private router:Router){}

  ngOnInit(): void {
    this.check()
  }

  check(){
    this.customerService.check().subscribe(
      data=>{
        if(!data){
          this.router.navigate(['/error'])
        }
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

  onSubmit(f:NgForm){
    this.customerService.feedback(JSON.stringify(f.value)).subscribe(
      data=>{
        if(data){
          console.warn(data)
          this.customerService.setMessage("Feedback send successfully", "green");
          this.router.navigate(['/'])
        }
      }
    )
  }
}
