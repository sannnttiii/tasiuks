import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePetugasPage } from './home-petugas.page';

const routes: Routes = [
  {
    path: '',
    component: HomePetugasPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then(m => m.InformationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePetugasPageRoutingModule { }
