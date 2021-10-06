import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditkegiatanPageRoutingModule } from './editkegiatan-routing.module';

import { EditkegiatanPage } from './editkegiatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditkegiatanPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [EditkegiatanPage]
})
export class EditkegiatanPageModule { }
