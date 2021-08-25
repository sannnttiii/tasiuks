import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmperizinanpetugasPageRoutingModule } from './confirmperizinanpetugas-routing.module';

import { ConfirmperizinanpetugasPage } from './confirmperizinanpetugas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmperizinanpetugasPageRoutingModule
  ],
  declarations: [ConfirmperizinanpetugasPage]
})
export class ConfirmperizinanpetugasPageModule {}
