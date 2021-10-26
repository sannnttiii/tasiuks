import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kegiatanuks',
  templateUrl: './kegiatanuks.page.html',
  styleUrls: ['./kegiatanuks.page.scss'],
})
export class KegiatanuksPage implements OnInit {

  constructor(private as: AuthService, private toastr: ToastController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listKegiatan();
  }
  kegiatans = []
  siswaid = this.route.snapshot.params['idsiswa']
  listKegiatan() {
    this.as.getKegiatanOrtu(this.siswaid).subscribe(
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
