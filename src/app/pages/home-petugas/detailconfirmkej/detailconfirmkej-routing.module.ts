import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailconfirmkejPage } from './detailconfirmkej.page';

const routes: Routes = [
  {
    path: '',
    component: DetailconfirmkejPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailconfirmkejPageRoutingModule {}
