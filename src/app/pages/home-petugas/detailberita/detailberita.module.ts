import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailberitaPageRoutingModule } from './detailberita-routing.module';

import { DetailberitaPage } from './detailberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailberitaPageRoutingModule
  ],
  declarations: [DetailberitaPage]
})
export class DetailberitaPageModule {}
