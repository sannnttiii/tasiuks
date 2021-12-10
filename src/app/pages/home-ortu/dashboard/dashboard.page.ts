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

    this.totalJumPerizinan = 0
    this.totalLaporan = 0
    this.listSiswa(this.ortuid)
    this.jumlahPerizinan(this.ortuid);
    this.jumlahPerizinanAll(this.ortuid);
    this.jumlahKejadian(this.ortuid);
    this.jumlahPemeriksaan(this.ortuid);
    this.updateTokenDevice();
    this.listKegiatan();
  }
  updateTokenDevice() {
    this.as.updateTokenDeviceOrtu(this.tokendevice, this.ortuid).subscribe((data) => {
      console.log(data);
    });
  }
  jumPerizinan: number = 0
  jumPerizinanAll: number = 0
  totalJumPerizinan: number = 0
  jumlahPerizinan(ortuid) {
    this.as.getJumlahPerizinan(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.jumPerizinan = data['pesan'][0]['jumlah'];
          if (this.jumPerizinan != 0) {
            this.totalJumPerizinan = this.totalJumPerizinan + 1;
          }

        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

  jumlahPerizinanAll(ortuid) {
    this.as.getJumlahPerizinanAll(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.jumPerizinanAll = data['pesan'][0]['jumlah'];
          if (this.jumPerizinanAll != 0) {
            this.totalJumPerizinan = this.totalJumPerizinan + 1;
          }
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

  jumPemeriksaan: number = 0
  jumKejadian: number = 0
  totalLaporan: number = 0
  jumlahPemeriksaan(ortuid) {
    this.as.getJumlahPemeriksaan(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.jumPemeriksaan = Number(data['pesan'][0]['jumlah']);
          if (this.jumPemeriksaan != 0) {
            this.totalLaporan = this.totalLaporan + this.jumPemeriksaan;
          }

        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  jumlahKejadian(ortuid) {
    this.as.getJumlahKejadian(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.jumKejadian = Number(data['pesan'][0]['jumlah']);
          if (this.jumKejadian != 0) {
            this.totalLaporan = this.totalLaporan + this.jumKejadian;
          }

        }
        else {
          console.log(data['pesan']);
        }
      }
    )
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

  confirmPerizinan() {
    if (this.totalJumPerizinan == 0) {
      this.toast('Tidak ada kegiatan yang perlu dikonfirmasi', 'warning')
    }
    else {
      this.router.navigate(['/homeortu/kegiatanuks'])
    }
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
