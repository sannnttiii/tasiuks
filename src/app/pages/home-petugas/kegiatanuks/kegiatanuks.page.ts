import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kegiatanuks',
  templateUrl: './kegiatanuks.page.html',
  styleUrls: ['./kegiatanuks.page.scss'],
})
export class KegiatanuksPage implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.listKegiatan()
  }

  kegiatans = []
  listKegiatan() {
    this.as.listKegiatanPerizinanPetugas().subscribe(
      (data) => {
        if (data['status']) {
          this.kegiatans = data['pesan']
        }
      }
    )
  }
}
