import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailpemeriksaanPage } from './detailpemeriksaan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailpemeriksaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailpemeriksaanPageRoutingModule {}
