import { VideoService } from './../services/video.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private videoService: VideoService) {}

  videos = [];

  ngOnInit(){
    this.videoService.getChannelVideo().subscribe((videos) => {
      // this.videos = videos.items[0].contentDetails.relatedPlaylists.uploads
      console.log(videos)
    })


 
  }
}
