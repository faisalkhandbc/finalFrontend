import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin, adminLogin } from 'src/app/model/admin';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery'
import { NgForm } from '@angular/forms';
import { signUp } from 'src/app/model/signup';
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  icon=faEnvelope;
  icon2=faLock
  msg: any = [];
  avail?: boolean;
  public errorMessage: any;
  public styl :any;
  showLogin=false;
  authError:String='';

  constructor(private admin:AdminService, private router:Router){}

    ngOnInit():void{
      if(this.admin.getMessage())
      {
        var x = this.admin.getMessage();
        this.setMessage(x.msg,x.color)
      } 
    }


    onSubmitRegister(f: NgForm) {


      
    }
  
    onSubmitLogin(f: NgForm) {
   
  
     
    }
  
    signinup() {
      this.msg = "";
      this.avail = false;
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
 