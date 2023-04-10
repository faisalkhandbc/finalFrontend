import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { Observable, map } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Table } from 'src/app/model/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
icon=faCartShopping
public count=0;

public tables:Table[]=[
  new Table(),
  new Table(),
  new Table(),
]

// table:Table=this.tables[0]

// table$:Observable<any> | undefined
table:any
isCollapsed = false;

constructor(private route:ActivatedRoute,private customer:CustomerService, private router:Router, private webSocket:WebsocketService){}

  ngOnInit(): void {
    this.getData();

    // this.route.paramMap.subscribe((params:any)=>{
    //   this.tables.forEach((t:Table)=>{
    //     if(t.id==params.id){
    //       this.table=t
    //     }
    //   })
    // })

    console.log(this.route.snapshot.paramMap.get('id'))
    this.table=this.route.snapshot.paramMap.get('id')

    this.webSocket.listen('cart').subscribe((result)=>{
      this.getData()
    })
  } 

  getData(){
   
  }

  togglePanel(collapseButton: HTMLElement, collapsePanel: HTMLElement) {
    if (this.isCollapsed) {
      collapseButton.classList.add('collapsed');
      collapsePanel.classList.remove('show');
    } else {
      collapsePanel.classList.add('show');
      collapseButton.classList.remove('collapsed');
    }
    this.isCollapsed = !this.isCollapsed
  }
  cnt(){
    this.customer.setCount(this.count)
  }

  

}
