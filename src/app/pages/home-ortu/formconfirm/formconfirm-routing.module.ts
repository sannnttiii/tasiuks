import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormconfirmPage } from './formconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: FormconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormconfirmPageRoutingModule {}
