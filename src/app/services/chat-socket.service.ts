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

  }


}
