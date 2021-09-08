import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'regis',
    loadChildren: () => import('./pages/regis/regis.module').then(m => m.RegisPageModule)
  },
  {
    path: 'homepetugas',
    loadChildren: () => import('./pages/home-petugas/home-petugas.module').then(m => m.HomePetugasPageModule),
    // canActivate: [AuthGuard]

  },
  {
    path: 'homeortu',
    loadChildren: () => import('./pages/home-ortu/home-ortu.module').then(m => m.HomeOrtuPageModule),
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
