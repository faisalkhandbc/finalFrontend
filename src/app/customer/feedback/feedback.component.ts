import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from 'src/app/model/feedback';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{

  public errorMessage: any;
  public styl: any;
  public empty: any = false;
  public loading:any= true;
  icon=faTrash

  public id:any
  feedbackList:Feedback[]|undefined;
  constructor(private route:ActivatedRoute,private customerService:CustomerService, private router:Router){}

  

  ngOnInit(): void {
    this.loading = true;
    this.check();
    this.id=this.route.snapshot.paramMap.get('id')
    this.getData()
  }

  getData() {
    this.customerService.getfeedbacks().subscribe(
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
    this.customerService.check().subscribe(
      data => {
        console.log(data);
      }
    ) 
  }

  onSubmit(f:NgForm){
    this.customerService.feedback(JSON.stringify(f.value)).subscribe(
      data=>{
        if(data){ 
          console.warn(data)
          this.getData()
          this.errorMessage="Feedback Send"
          this.router.navigate([`/home/${this.id}`])
        }
      }
    )
  }
}
