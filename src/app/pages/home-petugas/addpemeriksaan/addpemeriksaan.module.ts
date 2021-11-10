import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpemeriksaanPageRoutingModule } from './addpemeriksaan-routing.module';

import { AddpemeriksaanPage } from './addpemeriksaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpemeriksaanPageRoutingModule
  ],
  declarations: [AddpemeriksaanPage]
})
export class AddpemeriksaanPageModule {}
