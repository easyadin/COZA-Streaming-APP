import { StreamService } from './../services/stream.service';
import { Component, OnInit, Input, OnDestroy, ViewChild, QueryList, ElementRef } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import videojs from 'video.js';
import awsvideoconfig from './aws-video-exports.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { IonFab } from '@ionic/angular';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit, OnDestroy {
  streamOuput;
  private viewSubscription: Subscription;

  @ViewChild('target', { static: true }) target: ElementRef;
  @ViewChild('fabRef', { static: false }) fabRef: IonFab;

  player: videojs.Player; //init player

  // gesture thresh
  private DOUBLE_CLICK_THRESHOLD: number = 500;
  private lastOnStart: number = 0;
  // stream orientation
  isOrientation = 'landscape'
  // toggle giving options
  isActivated = false;

  constructor(private streamService: StreamService,
    private gestureCtrl: GestureController,
    private screenOrientation: ScreenOrientation,
    private streamingMedia: StreamingMedia) { }


  ngOnInit() {
    // double to toggle fullscreen
    const gesture = this.gestureCtrl.create({
      el: this.target.nativeElement,
      gestureName: '',
      threshold: 0,
      onStart: () => {
        this.onStart();
      }
    });
    gesture.enable();


    this.streamOuput = awsvideoconfig.awsOutputLiveLL;


    // instantiate Video.js
    this.player = videojs(this.target.nativeElement,
      {
        // fill: true,
        sources: [{
          src: this.streamOuput,
          type: "application/x-mpegURL"
        }],
        // fullscreenToggle: true,
        preload: "auto",
        controls: false,
      });

    this.player.play();
  }

  toLandscape() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  toPortrait() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  onFabClick() {
    console.log(this.fabRef.activated);
    this.fabRef.activated === true ? this.isActivated = false : this.isActivated = true;
  }


  ngOnDestroy(): void {
    // // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  ionViewWillLeave() {

  }

  onVideoDblClick() {
    this.player.requestFullscreen()
  }

  private onStart() {
    const now = Date.now();

    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      // check fullscreen status
       this.player.isFullscreen() ? (this.player.exitFullscreen(), this.player.exitFullWindow(),this.toPortrait()):(this.player.requestFullscreen(), this.toLandscape());
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }

}
