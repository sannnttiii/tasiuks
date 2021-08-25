import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencycallPageRoutingModule } from './emergencycall-routing.module';

import { EmergencycallPage } from './emergencycall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencycallPageRoutingModule
  ],
  declarations: [EmergencycallPage]
})
export class EmergencycallPageModule {}
