import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailconfirmrm',
  templateUrl: './detailconfirmrm.page.html',
  styleUrls: ['./detailconfirmrm.page.scss'],
})
export class DetailconfirmrmPage implements OnInit {
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
    this.as.listSiswaAccPemeriksaan().subscribe(
      (data) => {
        this.siswaacc = data['pesan'];
      }
    )
  }

  siswaaccyet = []
  listSiswaAccYet() {
    this.as.listSiswaNotYetAccPemeriksaan().subscribe(
      (data) => {
        this.siswaaccyet = data['pesan'];
      }
    )
  }



}
