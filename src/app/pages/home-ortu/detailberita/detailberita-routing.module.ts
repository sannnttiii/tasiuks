import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailberitaPage } from './detailberita.page';

const routes: Routes = [
  {
    path: '',
    component: DetailberitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailberitaPageRoutingModule {}
