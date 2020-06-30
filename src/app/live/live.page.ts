
import { StreamService } from './../services/stream.service';
import { Component, OnInit, Input, OnDestroy, ViewChild, QueryList, ElementRef } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import videojs from 'video.js';
import awsvideoconfig from './aws-video-exports.js'

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy {
  // test links
  streamOuput;

  @Input() urlSafe: SafeResourceUrl;

  isShowingLove = false;
  quickCommentList = [];
  comments; // array of any
  views; // array of any
  inputComment = '';
  private commentSubscription: Subscription;
  private viewSubscription: Subscription;

  @ViewChild('target', { static: true }) target: ElementRef;
  player: videojs.Player; //init player

  // stream orientation
  isPortrait = true;
  isFullscreen
  isPip


  constructor(
    private streamService: StreamService) { }



  ngOnInit() {
    this.streamOuput = awsvideoconfig.awsOutputLiveLL;
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, {
      fill: true,
      sources: [{
        src: this.streamOuput,
        type:"application/x-mpegURL"
      }]
    });

    this.player.play();

    this.quickCommentList = this.streamService.quickCommentList;

    this.commentSubscription = this.streamService.commentRecieved.subscribe(comments => {
      this.comments = comments
    })

    this.streamService.getAllComments(); // retrieve all comments

    // get view count
    this.viewSubscription = this.streamService.viewUpdated.subscribe(views => {
      this.views = 0
      this.views = views
    });

    this.streamService.getViewCount(); // init view count
  }

  onMakeComment(comment) {
    this.streamService.postComment(comment)
    this.inputComment = ''
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
    this.viewSubscription.unsubscribe();
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  ionViewWillLeave() {
    // this.streamService.disconnect();
  }



}
