import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailkegiatanPageRoutingModule } from './detailkegiatan-routing.module';

import { DetailkegiatanPage } from './detailkegiatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailkegiatanPageRoutingModule
  ],
  declarations: [DetailkegiatanPage]
})
export class DetailkegiatanPageModule {}
