import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddkegiatanPageRoutingModule } from './addkegiatan-routing.module';

import { AddkegiatanPage } from './addkegiatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddkegiatanPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AddkegiatanPage]
})
export class AddkegiatanPageModule { }
