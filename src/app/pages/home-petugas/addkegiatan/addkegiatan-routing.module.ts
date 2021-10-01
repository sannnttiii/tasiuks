import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddkegiatanPage } from './addkegiatan.page';

const routes: Routes = [
  {
    path: '',
    component: AddkegiatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddkegiatanPageRoutingModule {}
