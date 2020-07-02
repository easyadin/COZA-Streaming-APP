import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewlivestreamPage } from './newlivestream.page';

const routes: Routes = [
  {
    path: '',
    component: NewlivestreamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewlivestreamPageRoutingModule {}
