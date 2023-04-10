import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  icon=faEnvelope
  icon2=faLock
  msg:string|undefined;
  avail:boolean=false;

  constructor(private admin:AdminService, private router:Router){}
  ngOnInit(): void {
    this.check()
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  check(){
    this.admin.check().subscribe(data=>{

    })
  }

  onSubmit(f:NgForm){
    console.log(f.value)
    if(f.controls['password'].value!=f.controls['password1'].value){
      this.msg="Password doesn't match"
      this.avail=true
      return
    }
    this.admin.changepassword(f.value).subscribe((data:any)=>{
      console.log(data)
      if(data.error){
        console.log(data.error)
        this.avail=true;
        this.msg=data.error
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }
}
