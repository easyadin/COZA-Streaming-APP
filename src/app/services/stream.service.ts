import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatSocketService } from './chat-socket.service';


@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private charSocketService: ChatSocketService) { }

  // live stream output
  outputStream = environment.awsOutputLiveLL;

  // listen for new comment 
  commentRecieved = new Subject();

  // list for view count
  viewUpdated = new Subject();

  // Comments
  private _allComments = [];

  // Views
  private _views = [];

  // quick comment list
  private _quickCommentList = [
    'Halleluyah',
    'Thank you Jesus',
    'Amen',
    'Bless you sir',
    'Jesus is King!',
    '✨',
    '👋',
    '👌',
    '💖'
  ]

  // return quick comment
  get quickCommentList() {
    return [...this._quickCommentList]
  }

  // get views
  get views(){
    return [...this._views]
  }


  // get view count
  getViewCount(){
 
  
  }


  // disconnected client
  disconnect(){
    
  }
// Share functions
  onShare() {}

}
