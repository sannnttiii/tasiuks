import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditinfoPageRoutingModule } from './editinfo-routing.module';

import { EditinfoPage } from './editinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditinfoPageRoutingModule
  ],
  declarations: [EditinfoPage]
})
export class EditinfoPageModule {}
