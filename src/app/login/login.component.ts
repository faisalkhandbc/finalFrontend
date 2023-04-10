import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { faEnvelope,  faLock} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit{

  icon1=faEnvelope;
  icon2=faLock;

  msg!: string;
  avail: boolean=false;

  constructor(private router:Router, private adminService:AdminService){}

  ngOnInit(): void {
    
  }
  onSubmitRegister(f:NgForm){
   
  }

  onSubmitLogin(f:NgForm){

try{
  this.adminService.login(f.value).subscribe((data:any)=>{
    console.log(data)
    if (data.error){
      console.log(data.error);
      this.avail=true
      this.msg=data.error
    }else{
      localStorage.setItem("token",data.token);
      this.router.navigate(['/admin'])
  
    }
   })

}catch(err){
  console.log(err,"Error");
}
  }
}
