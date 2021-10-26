import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-ortu',
  templateUrl: './home-ortu.page.html',
  styleUrls: ['./home-ortu.page.scss'],
})
export class HomeOrtuPage implements OnInit {

  constructor(private as: AuthService,
    private router: Router,) { }

  ngOnInit() {
    this.jumlahPesan();
  }
  jumlah: number;
  jumlahPesan() {
    this.as.getJumlahPesanOrtu(this.as.ortuIdDb).subscribe(
      (data) => {
        this.jumlah = data['pesan']['0']['jumlah'];
      }
    )
  }
}
