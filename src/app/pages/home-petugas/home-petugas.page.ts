import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-petugas',
  templateUrl: './home-petugas.page.html',
  styleUrls: ['./home-petugas.page.scss'],
})
export class HomePetugasPage implements OnInit {

  constructor(
    private as: AuthService
  ) { }

  ngOnInit() {
    this.jumlahPesan();
  }
  jumlah: number;
  jumlahPesan() {
    this.as.getJumlahPesanPetugas(this.as.petugasIdDb).subscribe(
      (data) => {
        this.jumlah = data['pesan']['0']['jumlah'];
      }
    )
  }

}
