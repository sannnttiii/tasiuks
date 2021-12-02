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
    this.listKegiatan2();
    this.listKegiatan3();
    this.listKegiatan4();
    this.listKegiatan5();
  }
  allnot = []
  allacc = []
  kelasnot = []
  kelasacc = []
  nonperizinan = []
  // siswaid = this.route.snapshot.params['idsiswa']
  ket = '';
  listKegiatan() {
    this.as.getKegiatanOrtuAllAcc(this.as.ortuIdDb).subscribe(
      (data) => {
        if (data['status']) {
          this.allacc = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  listKegiatan2() {
    this.as.getKegiatanOrtuAllNot(this.as.ortuIdDb).subscribe(
      (data) => {
        if (data['status']) {
          this.allnot = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  listKegiatan3() {
    this.as.getKegiatanOrtuKelasAcc(this.as.ortuIdDb).subscribe(
      (data) => {
        if (data['status']) {
          this.kelasacc = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  listKegiatan4() {
    this.as.getKegiatanOrtuKelasNot(this.as.ortuIdDb).subscribe(
      (data) => {
        if (data['status']) {
          this.kelasnot = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }
  listKegiatan5() {
    this.as.getKegiatanOrtuNonPerizinan(this.as.ortuIdDb).subscribe(
      (data) => {
        if (data['status']) {
          this.nonperizinan = data['pesan'];
        }
        else {
          console.log(data['pesan']);
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
