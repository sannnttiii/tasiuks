import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePetugasPageRoutingModule } from './home-petugas-routing.module';

import { HomePetugasPage } from './home-petugas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePetugasPageRoutingModule
  ],
  declarations: [HomePetugasPage]
})
export class HomePetugasPageModule {}
