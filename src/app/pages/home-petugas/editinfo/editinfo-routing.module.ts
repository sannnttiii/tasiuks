import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditinfoPage } from './editinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EditinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditinfoPageRoutingModule {}
