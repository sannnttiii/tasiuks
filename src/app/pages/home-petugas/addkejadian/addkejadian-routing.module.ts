import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddkejadianPage } from './addkejadian.page';

const routes: Routes = [
  {
    path: '',
    component: AddkejadianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddkejadianPageRoutingModule {}
