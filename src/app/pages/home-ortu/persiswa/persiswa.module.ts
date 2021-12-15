import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersiswaPageRoutingModule } from './persiswa-routing.module';

import { PersiswaPage } from './persiswa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersiswaPageRoutingModule
  ],
  declarations: [PersiswaPage]
})
export class PersiswaPageModule {}
