import { StreamService } from './../services/stream.service';
import { Component, OnInit, Input, OnDestroy, ViewChild, QueryList, ElementRef } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import videojs from 'video.js';
import awsvideoconfig from './aws-video-exports.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy {
  streamOuput;
  private viewSubscription: Subscription;

  @ViewChild('target', { static: true }) target: ElementRef;
  player: videojs.Player; //init player

  // stream orientation
  isOrientation = 'landscape'

  constructor(private streamService: StreamService,
    private screenOrientation: ScreenOrientation,
    private streamingMedia: StreamingMedia) { }


  ngOnInit() {
    this.streamOuput = awsvideoconfig.awsOutputLiveLL;


    // instantiate Video.js
    this.player = videojs(this.target.nativeElement,
      {
        fill: true,
        sources: [{
          src: this.streamOuput,
          type: "application/x-mpegURL"
        }],
        fullscreenToggle: true,
        preload: "auto",
        controls: false,
      });

    this.player.play();
  }

  toLandscape() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }




  ngOnDestroy(): void {
    // // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  ionViewWillLeave() {

  }



}
