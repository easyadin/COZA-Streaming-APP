import { Livestream, postStream } from './../models/livestream';
import { LivestreamService } from './../services/livestream.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-newlivestream',
  templateUrl: './newlivestream.page.html',
  styleUrls: ['./newlivestream.page.scss'],
})
export class NewlivestreamPage implements OnInit {

  constructor(private loadingCtrl: LoadingController,
    private livestreamService: LivestreamService,
    public modalController: ModalController) { }

  // Data passed in by componentProps
  @Input() modelTitle: string;
  @Input() programType: string;
  @Input() streamName: string;
  @Input() ministerInCharge: string;
  @Input() streamURL: string;
  @Input() streamKey: string;

  postStream: postStream;

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    // check form validation
    if (!form.valid) {
      return; // cannot proceed
    }

    // update
    if (this.modelTitle === "Update Live Stream") {
      this.postStream = new postStream(
        form.value.streamURL,
        form.value.streamName,
        form.value.programType,
        form.value.ministerInCharge,
      );

      this.livestreamService.updateLiveStream(this.postStream, this.streamKey).subscribe(res => {
        this.livestreamService.fetchLivestreams();
        this.modalController.dismiss();
      })
    }
    // new stream
    else {
      this.postStream = new postStream(form.value.streamURL,
        form.value.streamName,
        form.value.programType,
        form.value.ministerInCharge,
      );

      this.livestreamService.newLiveStream(this.postStream).subscribe(res => {
        this.livestreamService.fetchLivestreams();
        this.modalController.dismiss();
      })
    }
  }

}
