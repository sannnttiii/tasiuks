import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private as: AuthService) {

  }
  tokendevice = this.as.tokendevice;
  petugasid = this.as.petugasIdDb;
  ngOnInit() {
    this.jumlahBelumAccPemeriksaan();
    this.jumlahBelumAccPerizinan();

    this.updateTokenDevice();
  }

  updateTokenDevice() {
    this.as.updateTokenDevicePetugas(this.tokendevice, this.petugasid).subscribe(
      (data) => {
        console.log(data['pesan'])
      }
    )
  }

  jumlahpemeriksaan = 0;
  jumlahkejadian = 0;
  jumlahBelumAccPemeriksaan() {
    this.as.getJumlahBelumAccPemeriksaan().subscribe(
      (data) => {
        this.jumlahpemeriksaan = data['pesan'];
      }
    )
  }

  jumlahperizinan = 0;
  jumlahBelumAccPerizinan() {
    this.as.getJumlahBelumAccPerizinan().subscribe(
      (data) => {
        this.jumlahperizinan = data['pesan'][0]['jumlah'];
      }
    )
  }
}
