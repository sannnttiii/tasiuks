import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormconfirmPageRoutingModule } from './formconfirm-routing.module';

import { FormconfirmPage } from './formconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormconfirmPageRoutingModule
  ],
  declarations: [FormconfirmPage]
})
export class FormconfirmPageModule {}
