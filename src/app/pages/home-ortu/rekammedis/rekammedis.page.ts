import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rekammedis',
  templateUrl: './rekammedis.page.html',
  styleUrls: ['./rekammedis.page.scss'],
})
export class RekammedisPage implements OnInit {
  tabActive: string;
  constructor(public route: ActivatedRoute, private router: Router, private as: AuthService, private toastr: ToastController,) {
    this.tabActive = "pemeriksaan";
  }
  cbperiode = 0;
  cbperiode2 = 0;
  periodeid = 0;
  defaultPeriode: string;
  siswaid = this.route.snapshot.params['idsiswa']
  ngOnInit() {
    this.listDetailSiswa(this.siswaid)
    this.listPeriode(this.siswaid);
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
        this.listPemeriksaan(this.siswaid, this.periodeid);
      }
    )
  }
  pemeriksaans = []
  siswa = []
  periodes = []
  periodes2 = []
  kejadians = []
  done = 0
  done2 = 0
  listDetailSiswa(siswaid) {
    this.as.listDetailSiswa(siswaid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswa = data['pesan'];
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
  listPeriode2(siswaid) {
    this.as.listPeriodeSiswa(siswaid).subscribe(
      (data) => {
        this.periodes2 = data;
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

  cbChanged() {
    this.listPemeriksaan(this.siswaid, this.cbperiode);
  }

  cbChanged2() {
    this.listKejadian(this.siswaid, this.cbperiode2);
  }

  confirmpemeriksaan(id) {
    this.as.updatePemeriksaan(id).subscribe(
      (data) => {
        if (data['status']) {
          this.toast(data['pesan'], 'success');
          // this.router.navigate(['/homeortu/dashboard/' + this.as.ortuIdDb])
          this.router.navigate(['/homeortu/dashboard/'])

        }
        else {
          this.toast(data['pesan'], 'danger');
        }
      }
    )
  }

  confirmkejadian(id) {
    this.as.updateKejadian(id).subscribe(
      (data) => {
        if (data['status']) {
          this.toast(data['pesan'], 'success');
          // this.router.navigate(['/homeortu/dashboard/' + this.as.ortuIdDb])
          this.router.navigate(['/homeortu/dashboard/'])

        }
        else {
          this.toast(data['pesan'], 'danger');
        }
      }
    )
  }

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 3000
    })
    toast.present();
  }


}
