import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KegiatanuksPage } from './kegiatanuks.page';

const routes: Routes = [
  {
    path: '',
    component: KegiatanuksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KegiatanuksPageRoutingModule {}
