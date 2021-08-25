import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmpemeriksaanPageRoutingModule } from './confirmpemeriksaan-routing.module';

import { ConfirmpemeriksaanPage } from './confirmpemeriksaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmpemeriksaanPageRoutingModule
  ],
  declarations: [ConfirmpemeriksaanPage]
})
export class ConfirmpemeriksaanPageModule {}
