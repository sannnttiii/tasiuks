import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailconfirmrmPage } from './detailconfirmrm.page';

const routes: Routes = [
  {
    path: '',
    component: DetailconfirmrmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailconfirmrmPageRoutingModule {}
