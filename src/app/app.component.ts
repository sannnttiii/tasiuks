import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private location: Location,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.backButtonEvent();
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/login') {
        this.backButtonAlert();
      }
      //  else{
      //   this.location.back();
      //  }

    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'Keluar aplikasi ?',
      buttons: [{
        text: "Batal",
        role: "cancel"
      }, {
        text: 'Keluar',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }
}
