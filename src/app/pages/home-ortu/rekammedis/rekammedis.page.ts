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
  cbperiode: number;
  siswaid = this.route.snapshot.params['idsiswa']
  ngOnInit() {
    this.listDetailSiswa(this.siswaid)
    this.listPeriode(this.siswaid);

  }

  pemeriksaans = []
  siswa = []
  periodes = []
  kejadians = []
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
  listPemeriksaan(siswaid, periodeid) {
    this.as.listRekamMedis(siswaid, periodeid).subscribe(
      (data) => {
        if (data['status']) {
          this.pemeriksaans = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  listKejadian(siswaid, periodeid) {
    this.as.listKejadian(siswaid, periodeid).subscribe(
      (data) => {
        if (data['status']) {
          this.kejadians = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

  cbChanged() {
    this.listPemeriksaan(this.siswaid, this.cbperiode);
  }

  cbChanged2() {
    this.listKejadian(this.siswaid, this.cbperiode);
  }

  confirmpemeriksaan(id) {
    this.as.updatePemeriksaan(id).subscribe(
      (data) => {
        if (data['status']) {
          this.toast(data['pesan'], 'success');
          this.router.navigate(['/homeortu/dashboard/' + this.as.ortuIdDb])
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
          this.router.navigate(['/homeortu/dashboard/' + this.as.ortuIdDb])
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
      duration: 2000
    })
    toast.present();
  }


}
