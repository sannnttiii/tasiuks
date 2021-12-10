import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddberitaPageRoutingModule } from './addberita-routing.module';

import { AddberitaPage } from './addberita.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddberitaPageRoutingModule
  ],
  providers: [DatePipe, Camera],
  declarations: [AddberitaPage]
})
export class AddberitaPageModule { }
