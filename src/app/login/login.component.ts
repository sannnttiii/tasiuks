import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(
    private as: AuthService,
    private toastr: ToastController,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) { }

  array = []
  login() {
    if (this.email && this.password) {
      this.as.signindb(this.email, this.password).subscribe(
        (data) => {
          if (data['result'] == 'OK') {
            this.as.setRole(data['role']);
            this.as.role(data['role']);

            // this.as.ortuId(data['data']);
            // this.as.setOrtuId(this.as.ortuIdDb);

            this.storage.ready().then(() => {
              //signin firebase
              this.as.signIn(this.email, this.password);
              //updateuid user token
              // this.as.updateUid(this.email, this.as.tokenUser).subscribe((data) => {
              //   console.log(data['pesan']);
              // });
            })

            if (data['role'] == 'ortu') {
              this.as.ortuId(data['data']);
              this.as.setOrtuId(this.as.ortuIdDb);
              this.router.navigate(['/homeortu/dashboard/']);
              // console.log("ortuid " + this.as.ortuIdDb);

            }
            else if (data['role'] == 'petugas') {
              this.as.petugasId(data['data'])
              this.as.setPetugasId(this.as.petugasIdDb);
              this.router.navigate(['/homepetugas/dashboard']);
              // console.log(this.as.petugasIdDb + "petugas id");
            }


          }
          else {
            this.toast('Gagal!Email dan password tidak sesuai.', 'danger')
          }
        }
      )

    }
    else {
      this.toast('Harap isi email dan password', 'warning');
    }
  }

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 2000
    })
    toast.present();
  }

  tokendevice: string;
  ngOnInit() {
    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      this.tokendevice = token.value;
      this.as.tokendevice = this.tokendevice;
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    //kalau lagi buka app nya
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification.title));
        if (JSON.stringify(notification.title) === '"Konfirmasi Perizinan"') {
          const alert = this.alertController.create({
            header: 'Konfirmasi Perizinan!',
            message: 'Anda memiliki perizinan kegiatan UKS yang harus dikonfirmasi.',
            buttons: ['OK']
          });

          (await alert).present();
        }
        else if (JSON.stringify(notification.title) === '"Konfirmasi Rekam Medis"') {
          const alert = this.alertController.create({
            header: 'Konfirmasi Rekam Medis!',
            message: 'Anda memiliki laporan kejadian atau hasil pemeriksaan yang harus dikonfirmasi.',
            buttons: ['OK']
          });

          (await alert).present();
        }
        else if (JSON.stringify(notification.title) === '"Pesan Baru Diterima"') {
          const alert = this.alertController.create({
            header: 'Pesan Baru Diterima!',
            message: 'Anda mendapatkan pesan baru.',
            buttons: ['OK']
          });

          (await alert).present();
        }
      },
    );

    //kalau dibuka (tap)
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification.notification));
      },
    );


    //untuk redirect jika user sudah login
    this.storage.ready().then(() => {
      this.as.getRole().then((result) => {
        if (result == 'ortu') {
          this.as.getOrtuId().then((result) => {
            this.as.ortuIdDb = result;
            // this.router.navigate(['/homeortu/dashboard/' + result]);
            this.router.navigate(['/homeortu/dashboard/']);

          })

        }
        else if (result == 'petugas') {
          this.as.getPetugasId().then((result) => {
            this.as.petugasIdDb = result;
            this.router.navigate(['/homepetugas/dashboard']);

          })
        }
      }, (error) => { });
    });
  }

}
