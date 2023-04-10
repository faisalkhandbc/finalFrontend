import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io , Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any
  // readonly url: string = "http://localhost:3000";
  private url="https://finalbackend-production-a3d3.up.railway.app"
  
  constructor() {
    this.socket=io(this.url)
  }

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data:any)=>{
        subscriber.next(data);
      })
    })
  }


  emit(eventName:string, data:any){
    this.socket.emit(eventName, data);
  }
  
}
