import { NewlivestreamPage } from './../newlivestream/newlivestream.page';
import { Livestream } from './../models/livestream';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LivestreamService } from '../services/livestream.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-stream-update',
  templateUrl: './stream-update.page.html',
  styleUrls: ['./stream-update.page.scss'],
})
export class StreamUpdatePage implements OnInit, OnDestroy {

  constructor(private livestreamService: LivestreamService,
    public modalController: ModalController) { }
  

  livestream;
  private streamSubscription: Subscription;
  //livestream details
  modelTitle
  programType
  streamName
  ministerInCharge
  streamURL
  streamkey

  ngOnInit() {
   this.streamSubscription = this.livestreamService.streamChanged.subscribe(stream =>{
     this.livestream = Object.keys(stream).map(key => ({ key: key, value: stream[key] }))
   })
   this.livestreamService.fetchLivestreams();
  }

  ngOnDestroy(): void {
    this.streamSubscription.unsubscribe()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewlivestreamPage,
      componentProps: {
        modelTitle: this.modelTitle,
        programType: this.programType,
        streamName: this.streamName,
        ministerInCharge: this.ministerInCharge,
        streamURL: this.streamURL,
        streamKey: this.streamkey
      }
    });
    return await modal.present();
  }

  onCreate() {
    this.modelTitle = "Add Live Stream"
    this.presentModal();
  }

  onUpdate(stream) {
    // set parameters to update
    this.modelTitle = "Update Live Stream"
    this.programType = stream.value.programType;
    this.streamName = stream.value.streamName;
    this.ministerInCharge = stream.value.ministerInCharge;
    this.streamURL = stream.value.streamURL;
    this.streamkey = stream.key;
    this.presentModal();
  }

  onDelete(streamkey) {
    this.livestreamService.deleteLiveStream(streamkey).subscribe(res =>{
     this.livestreamService.fetchLivestreams();
    })
  }
}
