import { NewlivestreamPage } from './../newlivestream/newlivestream.page';
import { Livestream } from './../models/livestream';
import { Component, OnInit } from '@angular/core';
import { LivestreamService } from '../services/livestream.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stream-update',
  templateUrl: './stream-update.page.html',
  styleUrls: ['./stream-update.page.scss'],
})
export class StreamUpdatePage implements OnInit {

  constructor(private livestreamService: LivestreamService,
    public modalController: ModalController) { }

  livestream = [];

  ngOnInit() {
    this.livestreamService.fetchLivestreams().subscribe(stream => {
      this.livestream = Object.keys(stream).map(key => ({ key: key, value: stream[key] }))
    })
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NewlivestreamPage,
    });
    return await modal.present();
  }

  onCreate() {
    this.presentModal()
  }

  onUpdate(streamid) {

  }

  onDelete(streamid) {
    this.livestreamService.deleteLiveStream(streamid).subscribe(data => {
      console.log(data)
    })
  }
}
