import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(); // replace with firebase realtime 
   }


   listen(eventname: string) :Observable<any> {
     return new Observable((subcribe) => {
       this.socket.on(eventname, (data) =>{
        subcribe.next(data);
       })
     })
   }

   emit(eventname: string, data: any){
     this.socket.emit(eventname, data);
   }

   disconnect(){
    this.socket.emit('disconnect');
  }
}
