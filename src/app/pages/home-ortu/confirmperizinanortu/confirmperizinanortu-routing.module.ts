import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmperizinanortuPage } from './confirmperizinanortu.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmperizinanortuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmperizinanortuPageRoutingModule {}
