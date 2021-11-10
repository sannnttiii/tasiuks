import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailkejadianPageRoutingModule } from './detailkejadian-routing.module';

import { DetailkejadianPage } from './detailkejadian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailkejadianPageRoutingModule
  ],
  declarations: [DetailkejadianPage]
})
export class DetailkejadianPageModule {}
