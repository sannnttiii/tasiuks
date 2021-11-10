import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailpemeriksaanPageRoutingModule } from './detailpemeriksaan-routing.module';

import { DetailpemeriksaanPage } from './detailpemeriksaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailpemeriksaanPageRoutingModule
  ],
  declarations: [DetailpemeriksaanPage]
})
export class DetailpemeriksaanPageModule {}
