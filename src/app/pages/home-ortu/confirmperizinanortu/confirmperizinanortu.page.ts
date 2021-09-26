import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmperizinanortu',
  templateUrl: './confirmperizinanortu.page.html',
  styleUrls: ['./confirmperizinanortu.page.scss'],
})
export class ConfirmperizinanortuPage implements OnInit {
  constructor(
    private as: AuthService,
  ) { }

  ortuid = this.as.ortuIdDb;
  ngOnInit() {
    this.listKegiatan(this.ortuid);
    this.listKegiatanForAll(this.ortuid);
  }


  kegiatans = []
  listKegiatan(ortuid) {
    this.as.listKegiatanPerizinan(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.kegiatans = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

  kegiatanAll = []
  listKegiatanForAll(ortuid) {
    this.as.listKegiatanPerizinanAll(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.kegiatans = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

}
