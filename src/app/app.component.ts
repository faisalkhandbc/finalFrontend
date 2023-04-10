import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './services/app-service.service';
import { error } from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'onebite-Frontend';

  constructor(private appService:AppServiceService){}
  ngOnInit() {
    
  }

  
}
