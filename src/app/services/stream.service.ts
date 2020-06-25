import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatSocketService } from './chat-socket.service';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private charSocketService: ChatSocketService) { }
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

  // main comments
  // Emit comment to server
  postComment(comment: string) {
    this.charSocketService.emit('chat', comment);
  }

  // Get all Comments from Server
  getAllComments() {
    this.charSocketService.listen('chat').subscribe((data) => {
      this._allComments.push(data)
      this.commentRecieved.next(this._allComments);
    })
  }


  // Love reactions
  postLove(love) {
    this.charSocketService.emit('love', love);
  }

  getAllLoves(){
    this.charSocketService.listen('love').subscribe((data) => {
      // this._allComments.push(data)
      // this.commentRecieved.next(this._allComments);
    })
  }


  // get view count
  getViewCount(){
    this.charSocketService.listen('views').subscribe((data) => {
      this._views = [];
      this._views.push(Object.keys(data).length)
      this.viewUpdated.next(this._views);
      console.log(this._views)
    })
  }


  // disconnected client
  disconnect(){
    
  }
// Share functions
  onShare() {}

}
