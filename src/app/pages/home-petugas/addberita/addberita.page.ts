import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addberita',
  templateUrl: './addberita.page.html',
  styleUrls: ['./addberita.page.scss'],
})
export class AddberitaPage implements OnInit {

  constructor(public datepipe: DatePipe, private route: ActivatedRoute, public camera: Camera, private as: AuthService, private toastr: ToastController, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  myDate: String = new Date().toISOString();
  kejadianid = this.route.snapshot.params['idkejadian']
  ortuDevice = this.route.snapshot.params['ortutokendevice'];
  siswaid = this.route.snapshot.params['idsiswa']

  file: File;
  imgUrl;
  changeListener($event): void {
    this.file = $event.target.files[0];
  }
  options: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };
  ambilFoto() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imgUrl = base64Image;
      }
      , (err) => {
        alert(err)
      }
    );
  }

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
  penanganan;
  catatan;
  tanggal;
  ditangani;
  save() {
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('penanganan', this.penanganan);
    formData.append('ditangani', this.ditangani);
    formData.append('catatan', this.catatan);
    formData.append('tanggal', this.tanggal);
    formData.append('kejadianid', this.kejadianid);
    formData.append('foto', this.imgUrl);


    this.http.post("http://192.168.1.6/tasiuks/api/insertdetailkejadian.php", formData).subscribe(
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
          this.router.navigate(['/homepetugas/detailberita/' + this.kejadianid + '/' + this.siswaid])
        }
        else {
          this.toast(data['pesan'], 'danger');
        }
      });
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
