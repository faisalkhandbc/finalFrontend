import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Food } from 'src/app/model/food';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchItem:string=''
  food:Food|undefined

  searchResult:Food[]|undefined
  constructor(private router:Router, private route:ActivatedRoute, private customer:CustomerService){}
  ngOnInit(): void {

    let query = this.route.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.customer.getfoodbycategory(query).subscribe((result)=>{
      console.log(result)
      
    })
  }

  search(){
    console.log()
    this.customer.getfoodbyname().subscribe()
  }
}
