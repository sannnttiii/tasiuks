import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailkejadian',
  templateUrl: './detailkejadian.page.html',
  styleUrls: ['./detailkejadian.page.scss'],
})
export class DetailkejadianPage implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router, private as: AuthService, private toastr: ToastController) { }
  periodeid = 0;
  defaultPeriode: string;
  siswaid = this.route.snapshot.params['idsiswa']
  ngOnInit() {
    this.listDetailSiswa(this.siswaid)
    this.listPeriode2(this.siswaid);
    this.DefaultPeriodeAktif();
  }
  DefaultPeriodeAktif() {
    this.as.getPeriodeAktif().subscribe(
      (data) => {
        this.periodeid = data['pesan']['0']['id'];
        this.defaultPeriode = data['pesan']['0']['periode'];
        // console.log(this.periodeid);
        this.listKejadian(this.siswaid, this.periodeid);
      }
    )
  }
  siswa = []
  periodes2 = []
  kejadians = []
  done2 = 0
  cbperiode2 = 0;
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
  listPeriode2(siswaid) {
    this.as.listPeriodeSiswa(siswaid).subscribe(
      (data) => {
        this.periodes2 = data;
      }
    )
  }
  listKejadian(siswaid, periodeid) {
    this.as.listKejadian(siswaid, periodeid).subscribe(
      (data) => {
        if (data['status']) {
          this.kejadians = data['pesan'];
          this.done2 = 1
        }
        else {
          console.log(data['pesan']);
          this.done2 = 2
        }
      }
    )
  }
  cbChanged2() {
    this.listKejadian(this.siswaid, this.cbperiode2);
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
