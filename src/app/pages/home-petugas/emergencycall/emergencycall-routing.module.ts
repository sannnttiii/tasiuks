import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencycallPage } from './emergencycall.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencycallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencycallPageRoutingModule {}
