import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RekammedisPage } from './rekammedis.page';

const routes: Routes = [
  {
    path: '',
    component: RekammedisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekammedisPageRoutingModule {}
