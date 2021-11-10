import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpemeriksaanPage } from './addpemeriksaan.page';

const routes: Routes = [
  {
    path: '',
    component: AddpemeriksaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpemeriksaanPageRoutingModule {}
