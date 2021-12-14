import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpemeriksaanPageRoutingModule } from './editpemeriksaan-routing.module';

import { EditpemeriksaanPage } from './editpemeriksaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpemeriksaanPageRoutingModule
  ],
  declarations: [EditpemeriksaanPage]
})
export class EditpemeriksaanPageModule {}
