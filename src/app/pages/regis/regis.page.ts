import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
})
export class RegisPage implements OnInit {

  name = '';
  email = '';
  phone = '';
  password = '';

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr:ToastController
  ) { }

  ngOnInit() {
  }

  async register() {
    if (this.name && this.email && this.password && this.phone) {

      const loading = await this.loadingCtrl.create({
        message: 'Mohon menunggu..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email,this.password)
      .then((data)=>{
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userToken':data.user.uid,
          'userName' : this.name,
          'userEmail':this.email,
          'userPhone' : this.phone,
          'createdAt' : Date.now()
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Registrasi Berhasil! Verifikasi email anda!','success');
          this.router.navigate(['/login']);
        })
        .catch(error=>{
          loading.dismiss();
         this.toast(error.message,'danger')
        })
      })
      .catch(error=>{
        loading.dismiss();
        this.toast(error.message,'danger')
      })
    }
    else
    {
      this.toast('Lengkapi form','warning');
    }
  }//end regis

  async toast(msg,status)
  {
    const toast = await this.toastr.create({
      message:msg,
      color:status,
      position:'bottom',
      duration:2000
    });
    toast.present();
  }
}
