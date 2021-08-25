import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailconfirmPageRoutingModule } from './detailconfirm-routing.module';

import { DetailconfirmPage } from './detailconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailconfirmPageRoutingModule
  ],
  declarations: [DetailconfirmPage]
})
export class DetailconfirmPageModule {}
