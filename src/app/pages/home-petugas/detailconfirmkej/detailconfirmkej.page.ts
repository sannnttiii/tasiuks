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
  tokendeviceortu = []
  arrdevice = []
  siswaaccyet = []
  listSiswaAccYet() {
    this.as.listSiswaNotYetAccKejadian().subscribe(
      (data) => {
        if (data['status']) {
          this.siswaaccyet = data['pesan'];
          this.tokendeviceortu = data['device'];
        }
        else {
          console.log(data['pesan'])
        }
      }
    )
  }


  remindkejadian() {
    this.arrdevice = this.tokendeviceortu.map(token => token.tokendevice);

    var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

    var notification = {
      'title': 'Konfirmasi Rekam Medis',
      'body': 'Anda memiliki laporan kejadian yang harus dikonfirmasi.',
      'icon': 'https://rekreartive.com/wp-content/uploads/2019/04/Logo-UKS-Usaha-Kesehatan-Sekolah-Warna.png',
      // 'click_action': 'FCM_PLUGIN_ACTIVITY'
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'registration_ids': this.arrdevice
      })
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.error(error);
    })
  }

}
