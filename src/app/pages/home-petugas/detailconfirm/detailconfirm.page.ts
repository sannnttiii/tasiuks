import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailconfirm',
  templateUrl: './detailconfirm.page.html',
  styleUrls: ['./detailconfirm.page.scss'],
})
export class DetailconfirmPage implements OnInit {
  tabActive: string;
  constructor(private as: AuthService, public route: ActivatedRoute,) {
    this.tabActive = "terima";
  }

  ngOnInit() {
    this.listKegiatan()
    this.listKelas();
    this.listKelasAjaran();
    this.listSiswaDeny();
    this.listSiswaAcc();
    this.listSiswaBelum();
  }
  kegiatanid = this.route.snapshot.params['kegiatanid'];
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
  untuk = []
  namakegiatan = '';
  periode = ''
  forall;
  listKelas() {
    this.as.listKelasKegiatanPerizinanPetugas(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.untuk = data['pesan']
          this.namakegiatan = data['pesan'][0]['nama']
          this.periode = data['pesan'][0]['periode']
          this.forall = data['pesan'][0]['forall']
        }
      }
    )
  }

  kelas = []
  listKelasAjaran() {
    this.as.getListKelas().subscribe(
      (data) => {
        this.kelas = data;
      }
    )
  }

  siswaacc = []
  listSiswaAcc() {
    this.as.listSiswaAccKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswaacc = data['pesan'];
        }
      }
    )
  }

  siswadeny = []
  listSiswaDeny() {
    this.as.listSiswaDenyKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswadeny = data['pesan'];
        }
      }
    )
  }

  siswabelum = []
  listSiswaBelum() {
    this.as.listSiswaNotYetAccKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswabelum = data['pesan'];
        }
      }
    )
  }
}
