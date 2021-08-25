import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailconfirmrmPageRoutingModule } from './detailconfirmrm-routing.module';

import { DetailconfirmrmPage } from './detailconfirmrm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailconfirmrmPageRoutingModule
  ],
  declarations: [DetailconfirmrmPage]
})
export class DetailconfirmrmPageModule {}
