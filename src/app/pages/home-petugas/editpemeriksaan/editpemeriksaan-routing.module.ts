import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpemeriksaanPage } from './editpemeriksaan.page';

const routes: Routes = [
  {
    path: '',
    component: EditpemeriksaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpemeriksaanPageRoutingModule {}
