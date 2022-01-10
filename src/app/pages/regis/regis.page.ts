import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
})
export class RegisPage implements OnInit {

  name = '';
  ayah = '';
  email = '';
  phone = '';
  phonea = '';
  password = '';
  alamat = '';
  petugas = ''
  alamat2 = ''
  email2 = ''
  password2 = ''
  phonep = ''



  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private as: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  usertoken = '';
  async register() {
    if (this.name && this.email && this.password && this.phone) {
      const formData = new FormData();
      const loading = await this.loadingCtrl.create({
        message: 'Mohon menunggu..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();


      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.usertoken = data.user.uid;
          data.user.sendEmailVerification();
          this.afs.collection('user').doc(data.user.uid).set({
            'userToken': data.user.uid,
            'userName': this.name,
            'userEmail': this.email,
            'userPhone': this.phone,
            'createdAt': Date.now()
          })
            .then(() => {

              formData.append('ayah', this.ayah);
              formData.append('ibu', this.name);
              formData.append('alamat', this.alamat);
              formData.append('hpibu', this.phone);
              formData.append('hpayah', this.phonea);
              formData.append('email', this.email);
              formData.append('pass', this.password);
              formData.append('usertoken', this.usertoken);

              this.http.post("http://192.168.1.10/tasiuks/api/regis.php", formData).subscribe((data) => {
                if (data['status']) {
                  console.log('success')

                  loading.dismiss();
                  this.toast('Registrasi Berhasil! Verifikasi email anda!', 'success');
                  this.router.navigate(['/login']);
                }
                else {
                  console.log('fail')
                }
              })
            })
            .catch(error => {
              loading.dismiss();
              this.toast(error.message, 'danger')
            })
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger')
        })

    }
    else {
      this.toast('Lengkapi form', 'warning');
    }
  }//end regis

  async register2() {
    if (this.petugas && this.email2 && this.password2 && this.phonep) {
      const formData = new FormData();
      const loading = await this.loadingCtrl.create({
        message: 'Mohon menunggu..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();


      this.afauth.createUserWithEmailAndPassword(this.email2, this.password2)
        .then((data) => {
          this.usertoken = data.user.uid;
          data.user.sendEmailVerification();
          this.afs.collection('user').doc(data.user.uid).set({
            'userToken': data.user.uid,
            'userName': this.petugas,
            'userEmail': this.email2,
            'userPhone': this.phonep,
            'createdAt': Date.now()
          })
            .then(() => {

              formData.append('petugas', this.petugas);
              formData.append('alamat2', this.alamat2);
              formData.append('hp', this.phonep);
              formData.append('email2', this.email2);
              formData.append('pass2', this.password2);
              formData.append('usertoken', this.usertoken);

              this.http.post("http://192.168.1.10/tasiuks/api/regispetugas.php", formData).subscribe((data) => {
                if (data['status']) {
                  console.log('success')

                  loading.dismiss();
                  this.toast('Registrasi Berhasil! Verifikasi email anda!', 'success');
                  this.router.navigate(['/login']);
                }
                else {
                  console.log('fail')
                }
              })
            })
            .catch(error => {
              loading.dismiss();
              this.toast(error.message, 'danger')
            })
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger')
        })

    }
    else {
      this.toast('Lengkapi form', 'warning');
    }
  }//end regis

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      color: status,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
