import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { data } from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {

  select=''
  ordertype:any=['Dine-In', 'Takeaway']
  public id:any
  
  // form: any = {
  //   name: null,
  //   contact: null
  // }; 
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  selectValue: any;

  isDineIn=false;

  public table:any

  constructor(private route:ActivatedRoute,private customerService:CustomerService, private router:Router, private fb:FormBuilder){}

  ngOnInit(): void {
    this.check()

    this.id=this.route.snapshot.paramMap.get('id')

    if (this.customerService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  form=this.fb.group({
    selectValue:['', Validators.required]
  })

  

  check(){
    this.customerService.check().subscribe(
      data=>{
        if(!data){
          this.router.navigate(['/error'])
        }
      }
    )
  }

  onSelected(e:any){
  this.select=e.target.value;
  console.log(this.select);
  }

  get orderType(){
    return this.form.get(this.ordertype)
  }

  onSubmit(f:NgForm){
    let table=this.id
    console.log(f.value,this.select, this.table);
    const cart = JSON.parse(localStorage.getItem('cart')!)
    if (cart == null){
      this.router.navigate(['/cart']);
      return;
    }
    this.customerService.placeOrder({...f.value,...cart,ordertype:this.select, table:table}).subscribe((data:any)=>{
      console.log(data)
      let orders_list = [];
      const orders = JSON.parse(localStorage.getItem("orders")!);
      if (orders){
        orders_list = [...orders,data.order];
      }else{
        orders_list.push(data.order);
      }
      console.log(orders_list,data.contact);
      localStorage.setItem("contact",data.contact)
      localStorage.setItem("orders",JSON.stringify(orders_list));
      localStorage.removeItem("cart");
      this.router.navigate([`/myorders/${this.id}`])
      // localStorage.setItem('')
    })
    console.log(cart);
    // this.customerService.register(JSON.stringify(f.value)).subscribe(data=>{
    //   console.log(data)
    //   this.router.navigate(['/myorders'])
    // })
  }
}
