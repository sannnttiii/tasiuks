import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor(public route: ActivatedRoute, private as: AuthService) { }

  petugasid = this.as.petugasIdDb;
  ngOnInit() {
    this.listInformasi();
  }

  infos = []

  listInformasi() {
    this.as.listInformasiPetugas().subscribe(
      (data) => {
        if (data['status']) {
          this.infos = data['pesan'];
        }
        else {
          console.log(data['pesan']);
        }
      }
    )
  }

  goDrive(url) {
    //jika ada http langsung kalau gaada yauda tambahin
    if (url.substring(0, 7) == "http://" || url.substring(0, 8) == "https://") {
      window.open(url, "_system", "location=yes");
    } else {
      window.open("http://" + url, "_system", "location=yes");
    }
  }
}
