import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private as: AuthService,
  ) { }
  ortuid = this.as.ortuIdDb;

  ngOnInit() {
    this.listDetailOrtu(this.ortuid);
  }

  ortu = []

  listDetailOrtu(ortuid) {
    this.as.listDetailOrtu(ortuid).subscribe(
      (data) => {
        if (data['status']) {
          this.ortu = data['pesan']
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }

  logout() {
    this.as.signOut();
  }
}
