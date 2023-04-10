import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService implements OnInit{

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  getDatafromAPI(){
   return this.http.get('/api/getData')
  }
}
