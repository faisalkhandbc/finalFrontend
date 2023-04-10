import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { category } from 'src/app/model/category';
import { Food } from 'src/app/model/food';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  public loading:boolean=false
  items:Food[]|undefined
  category:category[]|undefined
  constructor(private customer:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.loading=true;
    this.check()
  }

  getAll(){
    this.customer.getAllFood().subscribe(data=>{
      this.loading=false
      this.items=data
      console.log(data)
    })
  }

  getnonveg(){
    this.customer.getfoodbycategory("Non-Veg").subscribe(data=>{
      console.log(data)
    })
  }

  check(){
    this.customer.check().subscribe(data=>{

    })
  }
}
