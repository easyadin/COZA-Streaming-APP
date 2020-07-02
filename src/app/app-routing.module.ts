import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'live',
    loadChildren: () => import('./live/live.module').then( m => m.LivePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'stream-update',
    loadChildren: () => import('./stream-update/stream-update.module').then( m => m.StreamUpdatePageModule)
  },
  {
    path: 'newlivestream',
    loadChildren: () => import('./newlivestream/newlivestream.module').then( m => m.NewlivestreamPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
