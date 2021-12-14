import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-detailpemeriksaan',
  templateUrl: './detailpemeriksaan.page.html',
  styleUrls: ['./detailpemeriksaan.page.scss'],
})
export class DetailpemeriksaanPage implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router, private as: AuthService, private toastr: ToastController,) {
  }

  cbperiode = 0;
  periodeid = 0;
  defaultPeriode: string;
  siswaid = this.route.snapshot.params['idsiswa']
  ngOnInit() {
    this.listDetailSiswa(this.siswaid)
    this.listPeriode(this.siswaid);
    this.DefaultPeriodeAktif();
  }
  DefaultPeriodeAktif() {
    this.as.getPeriodeAktif().subscribe(
      (data) => {
        this.periodeid = data['pesan']['0']['id'];
        this.defaultPeriode = data['pesan']['0']['periode'];
        // console.log(this.periodeid);
        this.listPemeriksaan(this.siswaid, this.periodeid);
      }
    )
  }
  pemeriksaans = []
  siswa = []
  periodes = []
  kejadians = []
  done = 0
  ortudevice;
  listDetailSiswa(siswaid) {
    this.as.listDetailSiswa(siswaid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswa = data['pesan'];
          this.ortudevice = data['pesan']['0']['tokendevice'];
        }
        else {
          console.log(data['pesan']);

        }
      }
    )
  }

  listPeriode(siswaid) {
    this.as.listPeriodeSiswa(siswaid).subscribe(
      (data) => {
        this.periodes = data;
      }
    )
  }
  listPemeriksaan(siswaid, periodeid) {
    this.as.listRekamMedis(siswaid, periodeid).subscribe(
      (data) => {
        if (data['status']) {
          this.pemeriksaans = data['pesan'];
          this.done = 1
        }
        else {
          console.log(data['pesan']);
          this.done = 2
        }
      }
    )
  }

  cbChanged() {
    this.listPemeriksaan(this.siswaid, this.cbperiode);
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
