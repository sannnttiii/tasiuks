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

  ngOnInit() {
    this.jumlahBelumAccPemeriksaan();
    this.jumlahAll = this.jumlahpemeriksaan + this.jumlahkejadian;
  }
  jumlahAll = 0;
  jumlahpemeriksaan = 0;
  jumlahBelumAccPemeriksaan() {
    this.as.getJumlahBelumAccPemeriksaan().subscribe(
      (data) => {
        this.jumlahpemeriksaan = data['pesan'][0]['jumlah'];
      }
    )
  }

  jumlahkejadian = 0;
  jumlahBelumAccKejadian() {
    this.as.getJumlahBelumAccKejadian().subscribe(
      (data) => {
        this.jumlahkejadian = data['pesan'][0]['jumlah'];
      }
    )
  }
}
