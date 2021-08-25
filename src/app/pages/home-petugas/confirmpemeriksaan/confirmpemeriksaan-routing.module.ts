import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmpemeriksaanPage } from './confirmpemeriksaan.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmpemeriksaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmpemeriksaanPageRoutingModule {}
