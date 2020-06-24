import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor() { }
  // listen for new comment 
  commentRecieved = new Subject();

  // Comments
 private _allComments = [];


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

  // main comments
  // Receive comment
  postComment(comment: string) {
    this._allComments.push(comment)
    this.commentRecieved.next(this._allComments) // push new comment
  }

   getAllComments(){
    this.commentRecieved.next(this._allComments);
  }


}
