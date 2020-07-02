import { Livestream } from './../models/livestream';
import { Component, OnInit } from '@angular/core';
import { LivestreamService } from '../services/livestream.service';

@Component({
  selector: 'app-stream-update',
  templateUrl: './stream-update.page.html',
  styleUrls: ['./stream-update.page.scss'],
})
export class StreamUpdatePage implements OnInit {

  constructor(private livestreamService: LivestreamService) { }

  livestream = [];

  ngOnInit() {
    this.livestreamService.fetchLivestreams().subscribe(stream => {
      this.livestream = Object.keys(stream).map(key => ({ key: key, value: stream[key] }))
    })
  }


  onUpdate(streamid) {

  }

  onDelete(streamid) {
    this.livestreamService.deleteLiveStream(streamid).subscribe(data =>{
      console.log(data)
    })
  }
}
