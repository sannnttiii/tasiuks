import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kegiatanuks',
  templateUrl: './kegiatanuks.page.html',
  styleUrls: ['./kegiatanuks.page.scss'],
})
export class KegiatanuksPage implements OnInit {

  constructor(private as: AuthService, private toastr: ToastController,) {

  }

  ngOnInit() {
    this.listKegiatan();
  }

  kegiatans = []
  listKegiatan() {
    this.as.listKegiatan().subscribe(
      (data) => {
        if (data['status']) {
          this.kegiatans = data['pesan'];
        }
        else {
          this.toast(data['pesan'], 'warning');
        }
      }
    )
  }

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 2000
    })
    toast.present();
  }
}
