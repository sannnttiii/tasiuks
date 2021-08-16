import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmperizinanortuPageRoutingModule } from './confirmperizinanortu-routing.module';

import { ConfirmperizinanortuPage } from './confirmperizinanortu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmperizinanortuPageRoutingModule
  ],
  declarations: [ConfirmperizinanortuPage]
})
export class ConfirmperizinanortuPageModule {}
