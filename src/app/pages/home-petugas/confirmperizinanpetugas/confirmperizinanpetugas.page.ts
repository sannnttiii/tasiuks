import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmperizinanpetugas',
  templateUrl: './confirmperizinanpetugas.page.html',
  styleUrls: ['./confirmperizinanpetugas.page.scss'],
})
export class ConfirmperizinanpetugasPage implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.listKegiatan()
  }

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


}
