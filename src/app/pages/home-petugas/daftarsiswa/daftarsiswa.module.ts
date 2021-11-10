import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarsiswaPageRoutingModule } from './daftarsiswa-routing.module';

import { DaftarsiswaPage } from './daftarsiswa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarsiswaPageRoutingModule
  ],
  declarations: [DaftarsiswaPage]
})
export class DaftarsiswaPageModule {}
