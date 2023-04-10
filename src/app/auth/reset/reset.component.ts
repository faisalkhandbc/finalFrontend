import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {

  avail:boolean=false;
  msg!:string

  constructor(private adminService:AdminService, private router:Router){}

  onSubmitForgot(a:NgForm){
    this.adminService.reset(JSON.stringify(a.value)).subscribe((data:any)=>{
      console.log(data)
      if(data['msg']){
        // this.msg=data['msg']
        // this.avail=true;
        // return 
        this.router.navigate(['/change-password'])
      }
      else{
       
      }
    })
  }

  
}
