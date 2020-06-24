import { StreamService } from './../services/stream.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy {
  // test links
  isYoutubeLink = "https://www.youtube.com/embed/7jkY0TZ0C5o?autoplay=0&showinfo=0&controls=0"
  isYoutube = "true"
  isRtsp = ""
  isTestVideo = "blob:https://player.vimeo.com/6c0078dc-ef53-489c-9322-b10b3d6ddc2d"

  @Input() urlSafe: SafeResourceUrl;

  isShowingLove = false;
  quickCommentList = [];
  comments = [];

  private commentSubscription: Subscription;

  constructor(
    private streamService: StreamService,
    public sanitizer: DomSanitizer) { }



  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.isYoutubeLink)
    this.quickCommentList = this.streamService.quickCommentList;

    this.commentSubscription = this.streamService.commentRecieved.subscribe(comment =>{
      this.comments = comment
    })

    this.streamService.getAllComments(); // retrieve all comments
  }

  onMakeComment(comment) {
    this.streamService.postComment(comment)
  }

  onShowLove() {
    this.isShowingLove = true;

    // hide after 1s
    setTimeout(() => {
      this.isShowingLove = false;
    }, 600)
  }


  ngOnDestroy(): void {
   this.commentSubscription.unsubscribe(); 
  }
}
