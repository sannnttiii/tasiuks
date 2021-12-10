import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detailconfirm',
  templateUrl: './detailconfirm.page.html',
  styleUrls: ['./detailconfirm.page.scss'],
})
export class DetailconfirmPage implements OnInit {
  tabActive: string;
  constructor(private as: AuthService, public route: ActivatedRoute,) {
    this.tabActive = "terima";
  }

  ngOnInit() {
    this.listKegiatan()
    this.listKelas();
    this.listKelasAjaran();
    this.listSiswaDeny();
    this.listSiswaAcc();
    this.listSiswaBelum();
  }
  kegiatanid = this.route.snapshot.params['kegiatanid'];
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
  untuk = []
  namakegiatan = '';
  periode = ''
  forall;
  listKelas() {
    this.as.listKelasKegiatanPerizinanPetugas(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.untuk = data['pesan']
          this.namakegiatan = data['pesan'][0]['nama']
          this.periode = data['pesan'][0]['periode']
          this.forall = data['pesan'][0]['forall']
        }
      }
    )
  }

  kelas = []
  listKelasAjaran() {
    this.as.getListKelasPerizinan(this.kegiatanid).subscribe(
      (data) => {
        this.kelas = data;
      }
    )
  }

  siswaacc = []
  listSiswaAcc() {
    this.as.listSiswaAccKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswaacc = data['pesan'];
        }
      }
    )
  }

  siswadeny = []
  listSiswaDeny() {
    this.as.listSiswaDenyKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswadeny = data['pesan'];
        }
      }
    )
  }

  siswabelum = []
  // tokendeviceortu = ['dIQk3w3TQKyDb25g4Y5De6:APA91bH0NIV5stMi_xy-QoKwr3EFGaoQvlL_tyznaPCKGhPbi1fXscpYfpIkT5Zx4CBMhaKflFStLmYWLLn8YNABqEBAwOjZLptz4Ex2CjFGBdax1rkoUSY5fsbh56tk7BFjtG1TMFsK', 'fHXlKBNsSMGxLWSiSSUPWD:APA91bHwWeavTvFVtqT3untVojDbFf4BhEIV-EwXLsza4CMti_xvDGR-_gsn7tW4TfNbFCRUY6iBuY6bfR1Dy8lrKNmiRnYiNSpr7Hhl6imhxum_5Y6g6ZLLUvprPJdwsYw49wIk8Gc4']
  tokendeviceortu = []
  arrdevice = []
  listSiswaBelum() {
    this.as.listSiswaNotYetAccKegiatan(this.kegiatanid).subscribe(
      (data) => {
        if (data['status']) {
          this.siswabelum = data['pesan'];
          this.tokendeviceortu = data['device'];
        }
      }
    )
  }



  remind() {
    this.arrdevice = this.tokendeviceortu.map(token => token.tokendevice);

    var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

    var notification = {
      'title': 'Konfirmasi Perizinan',
      'body': 'Anda punya perizinan kegiatan UKS yang perlu dikonfirmasi',
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
