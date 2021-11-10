import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailkejadianPage } from './detailkejadian.page';

const routes: Routes = [
  {
    path: '',
    component: DetailkejadianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailkejadianPageRoutingModule {}
