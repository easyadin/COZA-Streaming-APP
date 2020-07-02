import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamUpdatePage } from './stream-update.page';

const routes: Routes = [
  {
    path: '',
    component: StreamUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamUpdatePageRoutingModule {}
