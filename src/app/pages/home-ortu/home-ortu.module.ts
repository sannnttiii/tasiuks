import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeOrtuPageRoutingModule } from './home-ortu-routing.module';

import { HomeOrtuPage } from './home-ortu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeOrtuPageRoutingModule
  ],
  declarations: [HomeOrtuPage]
})
export class HomeOrtuPageModule { }
