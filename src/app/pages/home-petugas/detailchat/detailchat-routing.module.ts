import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailchatPage } from './detailchat.page';

const routes: Routes = [
  {
    path: '',
    component: DetailchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailchatPageRoutingModule {}
