import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addpemeriksaan',
  templateUrl: './addpemeriksaan.page.html',
  styleUrls: ['./addpemeriksaan.page.scss'],
})
export class AddpemeriksaanPage implements OnInit {

  constructor(private as: AuthService, private toastr: ToastController, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.listKegiatan();
  }
  kegiatan = []
  listKegiatan() {
    this.as.listKegiatan().subscribe(
      (data) => {
        this.kegiatan = data['pesan'];
      }
    )
  }
  tinggi;
  berat;
  hasil = '';
  catatan = '';
  kg = '';
  kegiatanid = 0
  siswaid = this.route.snapshot.params['idsiswa'];
  ortuDevice = this.route.snapshot.params['ortutokendevice'];

  onChange(event) {
    // console.log(event.target.value)
    this.kegiatanid = event.target.value;
  }
  save() {
    if (this.tinggi && this.berat && this.kegiatanid) {
      const formData = new FormData();
      formData.append('tinggi', this.tinggi);
      formData.append('berat', this.berat);
      if (this.catatan != '') {
        formData.append('catatan', this.catatan);
      }
      if (this.hasil != '') {
        formData.append('hasil', this.hasil);
      }
      formData.append('kegiatanid', this.kegiatanid.toString());
      formData.append('siswaid', this.siswaid);

      this.http.post("http://192.168.1.8/tasiuks/api/insertpemeriksaan.php", formData).subscribe(
        (data) => {
          if (data['status']) {
            var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

            var to = this.ortuDevice;
            var notification = {
              'title': 'Konfirmasi Rekam Medis',
              'body': 'Anda memiliki laporan pemeriksaan yang harus dikonfirmasi.',
              // 'icon': 'https://rekreartive.com/wp-content/uploads/2019/04/Logo-UKS-Usaha-Kesehatan-Sekolah-Warna.png',
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
                'to': to
              })
            }).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.error(error);
            })

            this.toast(data['pesan'], 'success');
            this.router.navigate(['/homepetugas/detailpemeriksaan/' + this.siswaid])
          }
          else {
            this.toast(data['pesan'], 'danger');
          }
        });
    }
    else {
      this.toast('Harap isi form dengan lengkap', 'warning');
    }
  }
  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 3000
    })
    toast.present();
  }
}
