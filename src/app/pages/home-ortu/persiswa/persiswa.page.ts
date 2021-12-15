import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-persiswa',
  templateUrl: './persiswa.page.html',
  styleUrls: ['./persiswa.page.scss'],
})
export class PersiswaPage implements OnInit {

  constructor(private route: ActivatedRoute, private as: AuthService) { }

  ngOnInit() {
    this.totalJumPerizinan = 0
    this.totalLaporan = 0
    this.jumlahPerizinan(this.siswaid);
    this.jumlahPerizinanAll(this.siswaid);
    this.jumlahKejadian(this.siswaid);
    this.jumlahPemeriksaan(this.siswaid);
  }
  siswaid = this.route.snapshot.params['idsiswa'];
  jumPemeriksaan: number = 0
  jumKejadian: number = 0
  totalLaporan: number = 0
  jumlahPemeriksaan(siswaid) {
    this.as.getJumlahPemeriksaan(siswaid).subscribe(
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
  jumlahKejadian(siswaid) {
    this.as.getJumlahKejadian(siswaid).subscribe(
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

  jumPerizinan: number = 0
  jumPerizinanAll: number = 0
  totalJumPerizinan: number = 0
  jumlahPerizinan(siswaid) {
    this.as.getJumlahPerizinan(siswaid).subscribe(
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

  jumlahPerizinanAll(siswaid) {
    this.as.getJumlahPerizinanAll(siswaid).subscribe(
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
}
