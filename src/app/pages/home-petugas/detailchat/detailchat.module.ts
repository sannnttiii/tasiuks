import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailchatPageRoutingModule } from './detailchat-routing.module';

import { DetailchatPage } from './detailchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailchatPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [DetailchatPage]
})
export class DetailchatPageModule { }
