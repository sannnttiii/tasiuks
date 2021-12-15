import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private as: AuthService, public route: ActivatedRoute, private router: Router,
    private toastr: ToastController,) { }

  // ortuid = this.route.snapshot.params['idortu']
  ortuid = this.as.ortuIdDb
  tokendevice = this.as.tokendevice;

  ngOnInit() {
    this.listSiswa(this.ortuid)
    this.updateTokenDevice();
    this.listKegiatan();
  }
  updateTokenDevice() {
    this.as.updateTokenDeviceOrtu(this.tokendevice, this.ortuid).subscribe((data) => {
      console.log(data);
    });
  }

  siswas = []
  siswaid = 0;
  listSiswa(ortuid) {
    this.as.listSiswa(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswas = data['pesan'];
          this.siswaid = data['pesan']['0']['idsiswa'];
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }
  kegiatans = []
  ada = 0;
  listKegiatan() {
    this.as.getKegiatanTerdekat().subscribe(
      (data) => {
        if (data['status']) {
          this.kegiatans = data['pesan'];
          this.ada = 1;
        }
        else {
          this.ada = 2;
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
