import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KegiatanuksPageRoutingModule } from './kegiatanuks-routing.module';

import { KegiatanuksPage } from './kegiatanuks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KegiatanuksPageRoutingModule
  ],
  declarations: [KegiatanuksPage]
})
export class KegiatanuksPageModule {}
