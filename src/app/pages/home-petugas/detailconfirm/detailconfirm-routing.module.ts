import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailconfirmPage } from './detailconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: DetailconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailconfirmPageRoutingModule {}
