import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private as: AuthService, private callNumber: CallNumber, private toastr: ToastController) {

  }
  tokendevice = this.as.tokendevice;
  petugasid = this.as.petugasIdDb;
  ngOnInit() {
    this.updateTokenDevice();
    this.jumlahBelumAccPemeriksaan();
    this.jumlahBelumAccPerizinan();
  }

  updateTokenDevice() {
    this.as.updateTokenDevicePetugas(this.tokendevice, this.petugasid).subscribe((data) => {
      console.log(data);
    });
    console.log(this.tokendevice);
  }
  callcenter() {
    this.callNumber.callNumber("112", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  ambulans() {
    this.callNumber.callNumber("119", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  jumlahpemeriksaan = 0;
  jumlahkejadian = 0;
  jumlahBelumAccPemeriksaan() {
    this.as.getJumlahBelumAccPemeriksaan().subscribe(
      (data) => {
        this.jumlahpemeriksaan = data['pesan'];
      }
    )
  }


  jumlahperizinan = 0;
  jumlahBelumAccPerizinan() {
    this.as.getJumlahBelumAccPerizinan().subscribe(
      (data) => {
        this.jumlahperizinan = data['pesan'][0]['jumlah'];
      }
    )
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
}
