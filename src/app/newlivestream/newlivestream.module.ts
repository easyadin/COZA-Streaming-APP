import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlivestreamPageRoutingModule } from './newlivestream-routing.module';

import { NewlivestreamPage } from './newlivestream.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlivestreamPageRoutingModule
  ],
  declarations: [NewlivestreamPage]
})
export class NewlivestreamPageModule {}
