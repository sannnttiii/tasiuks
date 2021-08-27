import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

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
  ) { }

  array = []
  login() {
    if (this.email && this.password) {
      this.as.signindb(this.email, this.password).subscribe(
        (data) => {
          if (data['result'] == 'OK') {
            this.as.setRole(data['role']);
            this.as.role(data['role']);

            this.storage.ready().then(() => {
              //signin firebase
              this.as.signIn(this.email, this.password);
              //updateuid user token
              // this.as.updateUid(this.email, this.as.tokenUser).subscribe((data) => {
              //   console.log(data['pesan']);
              // });
            })

            if (data['role'] == 'ortu') {
              this.as.ortuIdDb = data['data']
              this.router.navigate(['/homeortu/dashboard']);
              // console.log("ortuid " + this.as.ortuIdDb);
            }
            else if (data['role'] == 'petugas') {
              this.as.petugasIdDb = data['data']
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
  toggleShow() {
    // this.showPassword = !this.showPassword;
  }
  ngOnInit() { }

}
