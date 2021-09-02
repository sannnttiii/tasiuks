import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private as: AuthService,
    private toastr: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  logout() {
    this.as.signOut();
    this.toast('Berhasil Keluar Aplikasi', 'success')
    this.router.navigate(['/login']);

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
