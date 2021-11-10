import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddberitaPageRoutingModule } from './addberita-routing.module';

import { AddberitaPage } from './addberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddberitaPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AddberitaPage]
})
export class AddberitaPageModule { }
