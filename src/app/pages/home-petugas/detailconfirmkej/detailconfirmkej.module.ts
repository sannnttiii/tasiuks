import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailconfirmkejPageRoutingModule } from './detailconfirmkej-routing.module';

import { DetailconfirmkejPage } from './detailconfirmkej.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailconfirmkejPageRoutingModule
  ],
  declarations: [DetailconfirmkejPage]
})
export class DetailconfirmkejPageModule {}
