import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addkejadian',
  templateUrl: './addkejadian.page.html',
  styleUrls: ['./addkejadian.page.scss'],
})
export class AddkejadianPage implements OnInit {

  constructor(public datepipe: DatePipe, private router: Router, private route: ActivatedRoute, private as: AuthService, private toastr: ToastController, private http: HttpClient,) { }

  ngOnInit() {
  }
  myDate: String = new Date().toISOString();

  siswaid = this.route.snapshot.params['idsiswa'];
  tanggal = new Date().toISOString();
  kejadian = ''
  onChangeDate(event) {
    // console.log(event.target.value)
    // console.log(this.transformDate(event.target.value))
    this.tanggal = this.transformDate(event.target.value)
  }

  transformDate(datetime: any): any {
    if (datetime) {
      const date = new Date(datetime);
      return this.datepipe.transform(date, 'yyyy/MM/dd HH:mm');
    }
    return datetime;
  }
  ortuDevice = this.route.snapshot.params['ortutokendevice'];
  save() {
    if (this.kejadian && this.tanggal) {
      const formData = new FormData();
      formData.append('kejadian', this.kejadian);
      formData.append('tanggal', this.tanggal);
      formData.append('siswaid', this.siswaid);

      this.http.post("http://192.168.1.10/tasiuks/api/insertkejadian.php", formData).subscribe(
        (data) => {
          if (data['status']) {
            var key = 'AAAAaL42s0U:APA91bEmjE6H-W95TsRvGw4s9L4iqtS6IFX3ZQ6_5uUeZofNeqS1oU2sHhaMAOyubZMUXBoQXPAsEq578zLNZ9EkKmJjLUT_0crb68EqrDON0mO7cZObrFc2JE3Ah8XyiJ2vfi5hgwZU';

            var to = this.ortuDevice;
            var notification = {
              'title': 'Konfirmasi Rekam Medis',
              'body': 'Anda memiliki laporan kejadian yang harus dikonfirmasi.',
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
            this.router.navigate(['/homepetugas/detailkejadian/' + this.siswaid])
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
