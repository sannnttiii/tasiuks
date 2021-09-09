import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeOrtuPage } from './home-ortu.page';

const routes: Routes = [
  {
    path: '',
    component: HomeOrtuPage,
    children: [
      // {
      //   path: 'dashboard/:idortu',
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)

      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)

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
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'rekammedis/:idsiswa',
    loadChildren: () => import('./rekammedis/rekammedis.module').then(m => m.RekammedisPageModule)
  },
  {
    path: 'confirmperizinanortu',
    loadChildren: () => import('./confirmperizinanortu/confirmperizinanortu.module').then(m => m.ConfirmperizinanortuPageModule)
  },
  {
    path: 'formconfirm',
    loadChildren: () => import('./formconfirm/formconfirm.module').then(m => m.FormconfirmPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeOrtuPageRoutingModule { }
