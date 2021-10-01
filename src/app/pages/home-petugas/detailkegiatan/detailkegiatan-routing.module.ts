import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailkegiatanPage } from './detailkegiatan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailkegiatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailkegiatanPageRoutingModule {}
