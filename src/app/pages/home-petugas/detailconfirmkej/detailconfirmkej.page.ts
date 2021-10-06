import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailconfirmkej',
  templateUrl: './detailconfirmkej.page.html',
  styleUrls: ['./detailconfirmkej.page.scss'],
})
export class DetailconfirmkejPage implements OnInit {
  tabActive: string;
  constructor(private as: AuthService) {
    this.tabActive = "terima";
  }

  ngOnInit() {
    this.listKelas()
    this.listSiswaAcc()
    this.listSiswaAccYet()
  }

  kelas = []
  listKelas() {
    this.as.getListKelas().subscribe(
      (data) => {
        this.kelas = data;
      }
    )
  }
  siswaacc = []
  listSiswaAcc() {
    this.as.listSiswaAccKejadian().subscribe(
      (data) => {
        this.siswaacc = data['pesan'];
      }
    )
  }

  siswaaccyet = []
  listSiswaAccYet() {
    this.as.listSiswaNotYetAccKejadian().subscribe(
      (data) => {
        this.siswaaccyet = data['pesan'];
      }
    )
  }

}
