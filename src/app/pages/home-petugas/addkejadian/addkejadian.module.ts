import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddkejadianPageRoutingModule } from './addkejadian-routing.module';

import { AddkejadianPage } from './addkejadian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddkejadianPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AddkejadianPage]
})
export class AddkejadianPageModule { }
