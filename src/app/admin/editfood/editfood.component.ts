import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { Food } from 'src/app/model/food';
@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.css']
})
export class EditfoodComponent implements OnInit {
selectImage($event: Event) {
throw new Error('Method not implemented.');
}
changeisitAvail() {
throw new Error('Method not implemented.');
}
qtychnage($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
pricechnage($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
 
  public food!: any;
  image: any;
  public isitavail:any; 
  public errorMessage: any;
  public styl :any;
  public loading:any= true;
  categorySelect:any
  constructor(private router: Router, private adminService: AdminService, private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.check();
   this.loading = true;
  //  this.route.forEach((params:any)=>{
    console.log(this.route.snapshot.paramMap.get('foodId'));
    this.adminService.getFood(this.route.snapshot.paramMap.get('foodId')!).subscribe((data)=>{
      console.log(data)
      this.food = data;
      this.loading = false;
    })
  //  })

  }
  check() {
    this.adminService.check().subscribe(data=>{

    })
  }

  onSelected(event:any){
    this.categorySelect=event.target.value;
  }
  onSubmit(f:Food){
    console.log(this.food,"EDIT GOOD");
    this.adminService.editfood({...this.food, category:this.categorySelect}).subscribe(data=>{
      console.log(data) 
      this.loading=false
      this.router.navigate(['/admin/viewfood'])
    })
  }


}  


