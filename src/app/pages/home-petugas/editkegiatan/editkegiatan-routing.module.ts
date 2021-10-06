import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditkegiatanPage } from './editkegiatan.page';

const routes: Routes = [
  {
    path: '',
    component: EditkegiatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditkegiatanPageRoutingModule {}
