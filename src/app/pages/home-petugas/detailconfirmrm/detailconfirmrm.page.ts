import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from "lodash";

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

  tokendeviceortu = []
  arrdevice = []
  siswaaccyet = []
  listSiswaAccYet() {
    this.as.listSiswaNotYetAccPemeriksaan().subscribe(
      (data) => {
        this.siswaaccyet = data['pesan'];
        this.tokendeviceortu = data['device'];
        // this.tes();
        // console.log(this.Obj3);

      }
    )
  }

  remindrm() {
    this.arrdevice = this.tokendeviceortu.map(token => token.tokendevice);

    var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

    var notification = {
      'title': 'Konfirmasi Rekam Medis',
      'body': 'Anda memiliki hasil pemeriksaan yang harus dikonfirmasi.',
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

  // Obj3;
  // tes() {
  //   this.Obj3 = _.differenceWith(this.siswaacc, this.siswaaccyet, function (o1, o2) {
  //     return o1['id'] === o2['_id']
  //   });
  // }

  // RemoveElementFromObjectArray(key: number) {
  //   this.siswaacc.forEach((value, index) => {
  //     if (value.nama == key) this.siswaacc.splice(index, 1);
  //   });
  // }

}

