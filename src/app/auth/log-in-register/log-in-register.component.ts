import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { faPhone,  faUser} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-log-in-register',
  templateUrl: './log-in-register.component.html',
  styleUrls: ['./log-in-register.component.css']
})
export class LogInRegisterComponent {

  showLogin=false;
  icon=faEnvelope;
  icon2=faLock;
  user=faUser;
  phone=faPhone;

  msg!:string
  avail:boolean=false

  constructor(private admin:AdminService, private router:Router){}

  ngOnInit(){

  }

  onSubmit(a:NgForm){

    if(a.controls['password'].value!=a.controls['password2'].value){
      this.msg="Password doesn't match"
      this.avail=true
      return
    }
    this.admin.register(a.value).subscribe((data:any)=>{
      console.log(data)
      if(data.error){
        console.log(data.error);
      this.avail=true
      this.msg=data.error
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }

  openLogin(){
    this.showLogin=true
  }

  openSignUp(){
    this.showLogin=false
  }
}
