import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmperizinanpetugasPage } from './confirmperizinanpetugas.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmperizinanpetugasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmperizinanpetugasPageRoutingModule {}
