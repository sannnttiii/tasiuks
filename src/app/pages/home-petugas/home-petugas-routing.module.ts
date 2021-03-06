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
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },
  {
    path: 'detailchat/:ortutokendb/:ortuid/:ortutokendevice',
    loadChildren: () => import('./detailchat/detailchat.module').then(m => m.DetailchatPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'emergencycall',
    loadChildren: () => import('./emergencycall/emergencycall.module').then(m => m.EmergencycallPageModule)
  },
  {
    path: 'confirmperizinanpetugas',
    loadChildren: () => import('./confirmperizinanpetugas/confirmperizinanpetugas.module').then(m => m.ConfirmperizinanpetugasPageModule)
  },
  {
    path: 'detailconfirm/:kegiatanid',
    loadChildren: () => import('./detailconfirm/detailconfirm.module').then(m => m.DetailconfirmPageModule)
  },
  {
    path: 'confirmpemeriksaan',
    loadChildren: () => import('./confirmpemeriksaan/confirmpemeriksaan.module').then(m => m.ConfirmpemeriksaanPageModule)
  },
  {
    path: 'detailconfirmrm',
    loadChildren: () => import('./detailconfirmrm/detailconfirmrm.module').then(m => m.DetailconfirmrmPageModule)
  },
  {
    path: 'detailconfirmkej',
    loadChildren: () => import('./detailconfirmkej/detailconfirmkej.module').then(m => m.DetailconfirmkejPageModule)
  },
  {
    path: 'addinfo',
    loadChildren: () => import('./addinfo/addinfo.module').then(m => m.AddinfoPageModule)
  },
  {
    path: 'editinfo/:infoid',
    loadChildren: () => import('./editinfo/editinfo.module').then(m => m.EditinfoPageModule)
  },
  {
    path: 'kegiatanuks',
    loadChildren: () => import('./kegiatanuks/kegiatanuks.module').then(m => m.KegiatanuksPageModule)
  },
  {
    path: 'addkegiatan',
    loadChildren: () => import('./addkegiatan/addkegiatan.module').then(m => m.AddkegiatanPageModule)
  },
  {
    path: 'editkegiatan/:kegiatanid',
    loadChildren: () => import('./editkegiatan/editkegiatan.module').then(m => m.EditkegiatanPageModule)
  },
  {
    path: 'addpemeriksaan/:idsiswa/:ortutokendevice',
    loadChildren: () => import('./addpemeriksaan/addpemeriksaan.module').then(m => m.AddpemeriksaanPageModule)
  },
  {
    path: 'addkejadian/:idsiswa/:ortutokendevice',
    loadChildren: () => import('./addkejadian/addkejadian.module').then(m => m.AddkejadianPageModule)
  },
  {
    path: 'daftarsiswa/:ket',
    loadChildren: () => import('./daftarsiswa/daftarsiswa.module').then(m => m.DaftarsiswaPageModule)
  },
  {
    path: 'detailpemeriksaan/:idsiswa',
    loadChildren: () => import('./detailpemeriksaan/detailpemeriksaan.module').then(m => m.DetailpemeriksaanPageModule)
  },
  {
    path: 'detailkejadian/:idsiswa',
    loadChildren: () => import('./detailkejadian/detailkejadian.module').then(m => m.DetailkejadianPageModule)
  },
  {
    path: 'detailberita/:idkejadian/:idsiswa',
    loadChildren: () => import('./detailberita/detailberita.module').then(m => m.DetailberitaPageModule)
  },
  {
    path: 'addberita/:idkejadian/:ortutokendevice/:idsiswa',
    loadChildren: () => import('./addberita/addberita.module').then(m => m.AddberitaPageModule)
  },
  {
    path: 'editpemeriksaan/:idpemeriksaan/:idsiswa',
    loadChildren: () => import('./editpemeriksaan/editpemeriksaan.module').then(m => m.EditpemeriksaanPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePetugasPageRoutingModule { }
