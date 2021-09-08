import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private as: AuthService, public route: ActivatedRoute) { }

  ortuid = this.route.snapshot.params['idortu']
  ngOnInit() {
    this.listSiswa(this.ortuid)
  }

  siswas = []
  listSiswa(ortuid) {
    this.as.listSiswa(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswas = data['pesan'];
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }

}
