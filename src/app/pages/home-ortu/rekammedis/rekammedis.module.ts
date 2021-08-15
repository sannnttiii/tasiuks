import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RekammedisPageRoutingModule } from './rekammedis-routing.module';

import { RekammedisPage } from './rekammedis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RekammedisPageRoutingModule
  ],
  declarations: [RekammedisPage]
})
export class RekammedisPageModule {}
